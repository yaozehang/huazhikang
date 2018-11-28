<template>
  <!-- 建设项目职业卫生“三同时”审查登记表 -->
  <div class="form-content">
    <div class="edit-table public-wire">
        <div class="public-headline">
          <span class="public-headline-btn">建设职业卫生"三同时"档案</span>
        </div>
        <div class="edit-mian">
          <div class="edit-mian-from">
           <el-form ref="form" :model="form" label-width="80px">
              <div class="row public-input public-div">
                <div class="col">
                  <span>用人单位:</span>
                  <input type="text" placeholder=""/>
                </div>
                 <div class="col">
                  <span>职业卫生管理负责人:</span>
                  <input type="text" placeholder=""/>
                </div>
                 <div class="col">
                  <span>联系电话:</span>
                  <input type="text" placeholder=""/>
                </div>
                 <div class="col">
                  <span>电子邮箱:</span>
                  <input type="text" placeholder=""/>
                </div>
              </div>
              <div class="row public-input public-div">
                <div class="col">
                  <span>项目名称:</span>
                  <input type="text" placeholder=""/>
                </div>
                 <div class="col">
                  <span>项目类型:</span>
                  <input type="text" placeholder=""/>
                </div>
                 <div class="col">
                  <span>项目投资:</span>
                  <input type="text" placeholder=""/>
                </div>
              </div>
              <div class="edit-date row public-div">
                 <div class="block col">
                  <span class="demonstration">建设工期(始):</span>
                  <el-date-picker
                    v-model="value2"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div class="block col">
                  <span class="demonstration">建设工期(止):</span>
                  <el-date-picker
                    v-model="value3"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                <div class="block col">
                </div>
              </div>
              <div class="edit-element">
                <div class="el-form-item">
                  <label class="el-form-item__label" style="width: 145px;">存在职业病危害因素:</label>
                  <div class="el-form-item__content" style="margin-left: 145px;">
                    <div class="el-textarea">
                      <textarea class="el-textarea__inner" style="min-height: 33px;"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row public-input public-div">
                <div class="block col">
                  <span class="demonstration">预计评价审核:</span>
                  <el-date-picker
                    v-model="value4"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                 <div class="block col">
                  <span class="demonstration">设计审查(严重危害项目):</span>
                  <el-date-picker
                    v-model="value5"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
                  <div class="block col">
                    <span class="demonstration">竣工验收:</span>
                    <el-date-picker
                      v-model="value6"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </div>
              </div>
                <div class="row public-input public-div public-select">
                <div class="block col">
                  <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                 <div class="block col">
                    <el-form-item label="活动区域">
                      <el-select v-model="form.region1" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                 </div>
                  <div class="block col">
                    <el-form-item label="活动区域">
                    <el-select v-model="form.region2" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="edit-element">
                <div class="el-form-item">
                  <label class="el-form-item__label" style="width: 150px;">预评价审核——结论:</label>
                  <div class="el-form-item__content" style="margin-left:150px;">
                    <div class="el-textarea">
                      <textarea class="el-textarea__inner" style="min-height: 33px;"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="edit-element">
                <div class="el-form-item">
                  <label class="el-form-item__label" style="width: 165px;">设计审查(严重危害项目):</label>
                  <div class="el-form-item__content" style="margin-left:165px;">
                    <div class="el-textarea">
                      <textarea class="el-textarea__inner" style="min-height: 33px;"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="edit-element">
                <div class="el-form-item">
                  <label class="el-form-item__label" style="width:140px;">竣工验收——结论:</label>
                  <div class="el-form-item__content" style="margin-left:140px;">
                    <div class="el-textarea">
                      <textarea class="el-textarea__inner" style="min-height: 33px;"></textarea>
                    </div>
                  </div>
                </div>
              </div>
               <div class="row public-input public-div">
                <div class="col">
                  <span>编制人:</span>
                  <input type="text" placeholder=""/>
                </div>
                 <div class="col">
                  <span>审核人:</span>
                  <input type="text" placeholder=""/>
                </div>
                <div class="block col">
                  <span class="demonstration">建档时间</span>
                  <el-date-picker
                    v-model="value7"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
            </el-form>
          </div>
        </div>
    </div>
    <div class="footer-btn">
      <button class="btn-1">保存</button>
      <button class="btn-2">清空</button>
    </div>
  </div>
</template>

<script>
// 三同时表单一
export default {
  name: 'EditFile',
  data () {
    return {
      selectedOptions: [],
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      form: {
        region: '',
        region1: '',
        region2: '',
        desc: '',
        desc1:'',
        desc2: '',
        desc3:'',
      }
    }
  }
}
</script>

<style lang="css" scoped>
.form-content{
   width: 100%;
   height: 100%;
}
.public-wire{
  /*border-top:1px solid #ccc;*/
}
.filing-date{
  margin:18px 0;
}
.filing-date .demonstration{
  margin-right: 10px;
}
.public-headline{
  position: relative;
  height: 41px;
  /*border-bottom: 1px solid #f45920;*/
}
.public-headline .public-headline-btn{
  position: absolute;
  display: inline-block;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  background-color: #f37a05;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-size: 16px;
  color: #fff;
  top: 1px;
  left: 0;
}
.edit-mian{
  border: 1px solid #ccc;
  margin-top: 10px;
  border-radius: 8px;
  width: 100%;
}
.edit-mian-from{
  margin: 18px 122px;
  padding: 0 15px 10px 15px;
  border: 1px solid #ccc;
  border-top: 1px solid #328fdd;
}
.row{display: -webkit-box;display: -webkit-flex;display: -moz-box;display: -ms-flexbox;display: flex;width: 100%;}
.row .col {-webkit-box-flex: 1;-webkit-flex: 1;-moz-box-flex: 1;-moz-flex: 1;-ms-flex: 1;flex: 1; display: block;width: 100%;}
.public-div{
  margin-top: 15px;
  height: 40px;
  line-height: 40px;
}
.public-div span{
  font-size: 14px;
  color: #303644;
}
.public-input input{
  font-size: 14px;
  outline: none;
  border: none;
  border-bottom: 1px solid #000;
  margin-left: 5px;
  height: 36px;
}
.edit-date .demonstration{
  margin-right: 10px;
}
.el-input__prefix{
  right: 10px!important;
}
.edit-element{
  margin-top: 15px;
}
.edit-element span{
    width: 145px;
    display: inline-block;
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.public-div .demonstration{
  margin-right: 10px;
}
.public-select .el-form-item__label{
  width: auto!important;
}
.footer-btn{
  height: 160px;
  text-align: center;
  line-height: 160px;
}
.footer-btn button{
  height: 40px;
  width: 120px;
  outline: none;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
}
.footer-btn .btn-1{
  background-color: #4e99f4;
  border:1px solid #4e99f4;
  color: #fff;
}
.footer-btn .btn-2{
  background-color: #fff;
  border:1px solid #4e99f4;
  color: #4e99f4;
  margin-left: 60px;
}
</style>