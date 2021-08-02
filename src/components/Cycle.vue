<style scoped>
* {
  font-size: 0.9rem;
}
.item-container {
  min-width: 20rem;
  margin: 0;
}
.item {
  padding: 0.5rem;
  border: solid black 1px;
  background-color: #fefefe;
}
.chosen {
  border: solid 2px #3089dc !important;
}
.item-sub {
  margin: 0.2rem 0 0 1.5rem;
}
.mover {
  cursor: move;
}
.fixed {
  position: absolute;
  right: 0;
  top: 0;
}
.image {
  width: 45px;
  height: 45px;
}
</style>

<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container "
    :list="list"
    :group="desc ? 'desc' : ''"
    :value="value"
    @input="emitter"
  >
    <div class="item-group" :key="el.pid" v-for="(el, index) in realValue">
      <div class="item">
        <div style="position: relative">
          <el-row :gutter="5">
            <el-col :span="4" v-if="el.showImg">
              <el-image
                class="image mover"
                :src="el.isUrl ? el.image : 'static/' + el.image + '.png'"
                fit="fill"
              >
              </el-image>
            </el-col>
            <el-col :span="4" v-else>
              <div class="image mover"></div>
            </el-col>
            <el-col :span="20">
              <div v-if="el.type != null">
                <div v-if="el.isEdit">
                  <el-row style="margin-top: 40px">
                    <el-col :span="7">type:</el-col>
                    <el-col :span="17"
                      ><el-input v-model="el.type" placeholder="" size="mini"
                    /></el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">是否需要图标:</el-col>
                    <el-col :span="12">
                      <el-switch
                        v-model="el.showImg"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="showImgChange(el)"
                      >
                      </el-switch>
                    </el-col>
                  </el-row>
                  <el-row v-if="el.showImg">
                    <el-col :span="7">image:</el-col>
                    <el-col :span="17">
                      <el-col :span="20">
                        <el-input
                          v-model="el.image"
                          @input="imageInput(el)"
                          placeholder=""
                          size="mini"
                        />
                      </el-col>
                    </el-col>
                  </el-row>
                  <div>子菜单==></div>
                </div>

                <div v-else>
                  <div>{{ el.type }}</div>
                  <div>子菜单==></div>
                </div>
              </div>
              <div v-else>
                <div v-if="el.isEdit">
                  <el-row style="margin-top: 40px">
                    <el-col :span="7">name:</el-col>
                    <el-col :span="17"
                      ><el-input v-model="el.name" placeholder="" size="mini"
                    /></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">id:</el-col>
                    <el-col :span="17">
                      <el-row :gutter="10">
                        <el-col :span="20">
                          <el-input
                            v-model="el.id"
                            placeholder=""
                            size="mini"
                          />
                        </el-col>
                        <el-button
                          icon="el-icon-search"
                          size="mini"
                          circle
                          @click="open"
                        ></el-button>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">damage:</el-col>
                    <el-col :span="17"
                      ><el-input v-model="el.damage" placeholder="" size="mini"
                    /></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">regex:</el-col>
                    <el-col :span="17"
                      ><el-input
                        v-model="el.regex"
                        placeholder="可不填"
                        size="mini"
                    /></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="7">award:</el-col>
                    <el-col :span="17"
                      ><el-input v-model="el.award" placeholder="" size="mini"
                    /></el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">是否需要图标:</el-col>
                    <el-col :span="12">
                      <el-switch
                        v-model="el.showImg"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="showImgChange(el)"
                      >
                      </el-switch>
                    </el-col>
                  </el-row>
                  <el-row v-if="el.showImg">
                    <el-col :span="7">image:</el-col>
                    <el-col :span="17">
                      <el-input
                        v-model="el.image"
                        placeholder=""
                        @input="imageInput(el)"
                        size="mini"
                      />
                    </el-col>
                  </el-row>
                </div>

                <div v-else>
                  <div>{{ "#" + index }}{{ el.name }}</div>
                  <div>{{ el.award + "像素币/个" }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="fixed">
            <el-button-group>
              <el-button
                size="mini"
                icon="el-icon-plus"
                circle
                @click="add(realValue, el.pid)"
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-connection"
                @click="addChild(realValue, el.pid)"
                circle
              ></el-button>
              <el-button
                size="mini"
                :icon="el.isEdit ? 'el-icon-check' : 'el-icon-edit'"
                circle
                @click="changeEdit(el)"
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-delete"
                circle
                @click="del(realValue, el.pid)"
              ></el-button>
            </el-button-group>
          </div>
        </div>
      </div>
      <cycle class="item-sub" :list="el.content" />
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "Cycle",
  components: {
    draggable,
  },
  data() {
    return {
      npid: 0,
    };
  },
  watch: {
    realValue: {
      //深度监听，可监听到对象、数组的变化
      handler() {
        sessionStorage.setItem("Rnpid", this.npid);
      },
      deep: true, //true 深度监听
    },
  },
  created() {
    let npid = sessionStorage.getItem("Rnpid");
    if (npid != null) {
      this.npid = npid;
    }
  },
  methods: {
    showImgChange(el) {
      if (el.showImg) {
        this.$set(el, "image", "");
      } else {
        this.$set(el, "image", false);
      }
    },
    imageInput(el) {
      if (el.image.indexOf("http") != -1) {
        this.$set(el, "isUrl", true);
      } else {
        this.$set(el, "isUrl", false);
      }
    },
    open() {
      window.open(
        "https://minecraft-zh.gamepedia.com/%E5%9F%BA%E5%B2%A9%E7%89%88%E6%95%B0%E6%8D%AE%E5%80%BC"
      );
    },
    emitter(value) {
      this.$emit("input", value);
    },
    changeEdit(el) {
      this.$set(el, "isEdit", !el.isEdit);
    },
    add(all, pid) {
      for (let [index, obj] of new Map(all.map((item, i) => [i, item]))) {
        if (obj.pid == pid) {
          this.npid++;
          if (obj.content != null) {
            let typeObj = {};
            typeObj.pid = "n" + this.npid;
            typeObj.showImg = true;
            typeObj.isEdit = false;
            typeObj.type = "分类";
            typeObj.order = "";
            typeObj.image = "";
            typeObj.content = [];
            all.splice(index, 0, typeObj);
            return null;
          } else {
            let Obj = {};
            Obj.pid = "n" + this.npid;
            Obj.showImg = true;
            Obj.isEdit = false;
            Obj.name = "名称";
            Obj.id = "";
            Obj.damage = "-1";
            Obj.regex = "";
            Obj.award = 0;
            Obj.image = "";
            all.splice(index, 0, Obj);
            return null;
          }
        }
        if (obj.content != null) {
          this.add(obj.content, pid);
        }
      }
    },
    addChild(all, pid) {
      for (let [index, obj] of new Map(all.map((item, i) => [i, item]))) {
        if (obj.pid == pid) {
          this.npid++;
          if (obj.content != null) {
            let Obj = {};
            Obj.pid = "c" + this.npid;
            Obj.showImg = true;
            Obj.isEdit = false;
            Obj.name = "名称";
            Obj.id = "";
            Obj.damage = "-1";
            Obj.regex = "";
            Obj.award = 0;
            Obj.image = "";
            obj.content.splice(index, 0, Obj);
            return null;
          } else {
            this.npid++;
            let typeObj = {};
            typeObj.pid = "c" + this.npid;
            typeObj.showImg = true;
            typeObj.isEdit = false;
            typeObj.type = "分类";
            typeObj.order = "";
            typeObj.image = "";
            typeObj.content = [];
            all.splice(index, 0, typeObj);
            return null;
          }
        }
        if (obj.content != null) {
          this.addChild(obj.content, pid);
        }
      }
    },
    del(all, pid) {
      all.forEach((obj, index) => {
        if (obj.pid == pid) {
          this.$confirm("此操作将删除该项, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              all.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        }
        if (obj.content != null) {
          this.del(obj.content, pid);
        }
      });
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 1500,
        disabled: false,
        ghostClass: "ghost",
        chosenClass: "chosen",
        handle: ".mover",
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    },
    desc() {
      if (this.realValue != null) {
        return true;
      }
    },
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
    list: {
      required: false,
      type: Array,
      default: null,
    },
  },
};
</script>
