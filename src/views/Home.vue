<template>
  <div class="home">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="add"
              >新建节点</el-button
            >
            <el-button type="primary" size="small" @click="importJson"
              >导入文件</el-button
            >

            <el-button type="primary" size="small" @click="edit = true"
              >编辑JSON</el-button
            >

            <el-button type="primary" size="small" @click="exportJson"
              >导出文件</el-button
            >
            <el-button type="primary" size="small" @click="dialogVisible = true"
              >使用帮助</el-button
            >
            <el-dialog title="帮助" :visible.sync="dialogVisible" width="50%">
              <h3>1.新建节点</h3>
              <p>
                点击该按钮在<strong>当前分类</strong>下新建一个<strong>菜单节点</strong>，菜单节点下方有四个选择按钮，分别是：
                <strong>添加一个自身节点、</strong>
                <strong>创建一个 父/子节点</strong
                >[如果该节点为菜单节点则创建子节点，反之亦然]、
                <strong>编辑节点、删除节点</strong
                >,通过菜单节点创建的子节点也有四个按钮，除了
                <strong>创建一个 父/子节点</strong>外其他功能类似
              </p>
              <h3>2.导入文件</h3>
              <p>
                点击该按钮会将<strong>按钮下方上传完成的文件</strong>给导入到下方配置中，如果
                <strong>还未上传完成</strong
                >则会有相应提示，<strong>上传完成时</strong>下方会显示文件名称以及右侧有个√
                <br /><strong>如上传不成功请多次尝试</strong>
              </p>

              <h3>3.导出文件</h3>
              <p>
                点击该按钮会将下方<strong>已展示的节点配置信息</strong>以<strong>json文件</strong>导出到浏览器下载。
                <strong
                  >导出的文件会自动将order属性排序，并且自动删除无用属性:pid,isEdit,showImg
                  [只在编辑器作用]</strong
                >
              </p>
              <h3>4.节点操作</h3>
              <p>
                该应用能对创建的节点进行<strong>增删改</strong>操作并且以<strong>图、文[json]</strong>的形式显示出来,
                各个节点能通过<strong>拖拽</strong>互换位置<strong>[拖住图标部位]</strong>,子节点可以拖拽并依附于
                <strong>其他父节点</strong
                >的下方，对于换位分类操作<strong>非常的方便</strong>，
                <strong>父节点也能拖拽到其他父节点的下方依附</strong>。
              </p>
              <h3>5.信息查询</h3>
              <p>
                对于各节点的填写，<strong>id和图标</strong>可以算是<strong>必填项</strong>,这些信息的查找可以通过id栏右侧的
                <strong>查找按钮</strong
                >定位到<strong>我的世界wiki网页</strong>中，然后通过键盘按住<strong>ctrl+f</strong>来搜索
                你想查询的物品，按<strong>回车</strong>便会定位到该物品信息处，<strong>复制粘贴即可</strong>。<br />物品图标则需要在本应用给出
                的<strong>文件夹中[static\textures]</strong>通过文件夹搜索id来找到对应的图片，
                <br /><strong
                  >按格式[例如:textures/blocks/dirt](图片不需要.png)</strong
                >复制图片路径即可。 <br /><strong
                  >也可以使用网络图片,在输入框输入完整图片地址</strong
                >
              </p>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <el-dialog
              title="编辑JSON"
              :visible.sync="edit"
              width="50%"
              @opened="openEdit"
            >
              <pre class="pre" ref="preR" contenteditable="true"></pre>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="confirmEdit">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>
          <el-col :span="12">
            <el-upload
              drag
              :limit="1"
              action="https://jsonplaceholder.typicode.com/posts"
              ref="upload"
              accept=".json"
              :file-list="fileList"
              :on-success="onSuccess"
              :on-remove="onRemove"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                上传json文件，且只能上传 1 个文件
              </div>
            </el-upload>
          </el-col>
        </el-row>
        <div class="grid-content bg-purple">
          <el-tabs v-model="activeName">
            <el-tab-pane label="回收商店" name="recycle">
              <el-row :gutter="20">
                <el-col :span="12"><cycle v-model="shop.recycle" /></el-col>
                <el-col :span="12">
                  <pre class="pre">{{ shop.recycle }}</pre>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="出售商店" name="sell">
              <el-row :gutter="20">
                <el-col :span="12"><sell v-model="shop.sell" /></el-col>
                <el-col :span="12">
                  <pre class="pre">{{ shop.sell }}</pre>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div></el-col
      >
    </el-row>
  </div>
</template>
   
<script>
import draggable from "vuedraggable";
import cycle from "@/components/Cycle";
import sell from "@/components/Sell";
import FileSaver from "file-saver";
export default {
  name: "Home",
  components: {
    draggable,
    cycle,
    sell,
  },
  data() {
    return {
      fileList: [],
      uploadData: [],
      activeName: "recycle",
      wpid: 0,
      shop: { recycle: [], sell: [] },
      dialogVisible: false,
      edit: false,
    };
  },
  watch: {
    shop: {
      //深度监听，可监听到对象、数组的变化
      handler() {
        sessionStorage.setItem("data", JSON.stringify(this.shop));
        sessionStorage.setItem("wpid", this.wpid);
      },
      deep: true, //true 深度监听
    },
  },
  created() {
    let data = sessionStorage.getItem("data");
    let wpid = sessionStorage.getItem("wpid");
    if(wpid!=null){
      this.wpid = wpid
    }
    if (data != null) {
      this.shop = JSON.parse(data);
    } else {
      this.addAttributes(this.shop.recycle, 0);
      this.addAttributes(this.shop.sell, 0);
    }
  },
  methods: {
    addAttributes(object, pid) {
      for (let obj of object) {
        pid++;
        this.$set(obj, "pid", pid);
        this.$set(obj, "isEdit", false);
        this.$set(obj, "showImg", true);
        if (typeof obj.image != "boolean") {
          obj.image.indexOf("http") != -1
            ? this.$set(obj, "isUrl", true)
            : this.$set(obj, "isUrl", false);
        }
        if (obj.content != null) {
          this.addAttributes(obj.content, pid);
        }
      }
    },
    removeAttributes(object) {
      for (let [index, obj] of new Map(object.map((item, i) => [i, item]))) {
        delete obj.pid;
        delete obj.isEdit;
        delete obj.isUrl;
        delete obj.showImg;
        obj.order = index + 1;
        if (obj.content != null) {
          this.removeAttributes(obj.content);
        }
      }
    },
    exportJson() {
      let objString = JSON.stringify(this.shop);
      var obj = JSON.parse(objString);
      this.removeAttributes(obj.recycle);
      this.removeAttributes(obj.sell);
      const data = JSON.stringify(obj, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      FileSaver.saveAs(blob, `shopdata.json`);
    },
    add() {
      this.wpid++;
      let typeObj = {};
      typeObj.pid = "w" + this.wpid;
      typeObj.isEdit = false;
      typeObj.showImg = true;
      typeObj.type = "分类";
      typeObj.order = "";
      typeObj.image = "";
      typeObj.content = [];
      if (this.activeName == "recycle") {
        this.shop.recycle.unshift(typeObj);
      } else {
        this.shop.sell.unshift(typeObj);
      }
    },
    onSuccess(res, file, fileList) {
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        this.uploadData = [];
        this.uploadData = JSON.parse(e.target.result);
      };
    },
    onRemove(file) {
      this.fileList = [];
    },
    importJson() {
      this.$emit("uploadParent", this.uploadData);
      if (this.uploadData.recycle != null) {
        this.shop = this.uploadData;
        this.addAttributes(this.shop.recycle, 0);
        this.addAttributes(this.shop.sell, 0);
        this.$message({
          type: "success",
          message: `导入文件成功!`,
        });
      } else {
        this.$alert("等待文件上传完成,如果上传不成功请多次尝试", "提示", {
          confirmButtonText: "确定",
        });
      }
    },
    openEdit() {
      this.$refs.preR.innerText = JSON.stringify(this.shop, null, 2);
    },
    confirmEdit() {
      if (this.$refs.preR.innerText != "") {
        if (
          this.$refs.preR.innerText.indexOf("recycle") < 0 ||
          this.$refs.preR.innerText.indexOf("sell") < 0
        ) {
          this.$message({
            type: "error",
            message: `输入的JSON缺少recycle或sell属性!`,
          });
          return null;
        }
        try {
          this.shop = JSON.parse(this.$refs.preR.innerText);
        } catch (e) {
          this.$message({
            type: "error",
            message: `输入的JSON格式有误!`,
          });
          return null;
        }
        this.$message({
          type: "success",
          message: `修改JSON成功!`,
        });
        this.edit = false;
      } else {
        this.$message({
          type: "error",
          message: `输入不能为空!`,
        });
      }
    },
    cancelEdit() {
      this.$refs.preR.innerText = JSON.stringify(this.shop, null, 2);
      this.edit = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style scoped>
* {
  list-style: none;
}
.list-group-item {
  cursor: move;
  background: #fff;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.flip-list-move {
  transition: transform 0.5s;
}
.pre {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  font-size: 0.5em;
  overflow-y: auto;
}
</style>
