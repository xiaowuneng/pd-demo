<template>
  <el-dialog
    :title="`${title}诗词`"
    :visible.sync="dialogVisible"
    @open="handleOpen"
    width="40%">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
      <el-form-item label="作者" prop="author" class="input-item">
        <el-input v-model="ruleForm.author" placeholder="2~10个字之间，仅支持中文"></el-input>
      </el-form-item>
      <el-form-item label="诗句" prop="content" class="input-item">
        <el-input v-model="ruleForm.content" placeholder="诗句，2～20个字之间"></el-input>
      </el-form-item>
      <el-form-item label="朝代" prop="dynasties" class="input-item">
        <el-select v-model="ruleForm.dynasties" placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="item.id"
            :label="item.name"
            :value="index">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="validate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { session, cnReg } from '@/utils/tools'
import {getDynasties} from '@/api/'

export default {
  name: 'PoetryAdd',
  props: ['title', 'isModify', 'modifyData'],
  data () {
    return {
      dialogVisible: false,
      options: [],
      ruleForm: {
        author: '',
        content: '',
        dynasties: ''
      },
      rules: {
        author: [
          { required: true, message:'请输入作者名', trigger: 'blur' },
          { pattern: cnReg, message:'作者名只能是汉字噢～',trigger: 'blur' },
          { validator: this.checkAuthor, trigger: 'blur' }
        ],
        content: [
          { required: true, message:'请输入诗句', trigger: 'blur' },
          { validator: this.checkContent, trigger: 'blur' }
        ],
        dynasties: [
        ]
      }
    }
  },
  methods: {
    validate () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.sure()
        } else {
          return false
        }
      })
    },
    sure () {
      let poetryList = session('totalPoetry')
      const obj = {
        id: poetryList.length + 1 + '',
        content: this.ruleForm.content,
        dynastiesId: this.ruleForm.dynasties === '' ? '' : this.options[this.ruleForm.dynasties].id,
        dynasties: this.ruleForm.dynasties === '' ? '' : this.options[this.ruleForm.dynasties].name,
        author: this.ruleForm.author
      }
      if(this.isModify) {
        const index = poetryList.findIndex(item => item.id === this.modifyData.id)
        this.$set(poetryList, index, obj)
      } else {
        poetryList.unshift(obj)
        this.$parent.currentPage = 1 // 新增时，新数据插在最前面，页面返回第一页
      }
      session('totalPoetry', poetryList)
      this.close()
    },
    async handleOpen () {
      if(!session('totalDynasties')) {
        await getDynasties().then(res => { // 此处朝代集合未获取时，下方初始化获取朝代会显示 -1
          session('totalDynasties', res.data)
          this.options = res.data
        })
      } else {
        this.options = session('totalDynasties')
      }
      if(this.isModify) {
        this.ruleForm.author = this.modifyData.author
        this.ruleForm.content  = this.modifyData.content
        this.ruleForm.dynasties  = this.options.findIndex(item => item.id === this.modifyData.dynastiesId)
      } else {
        // 重置表单，不会清除修改时赋予的值，此处手动清除
        this.ruleForm = {
          author: '',
          content: '',
          dynasties: ''
        }
      }
    },
    close () {
      this.dialogVisible = false
      this.resetFrom()
      this.$parent.init() // 刷新列表
    },
    resetFrom () {
      // 关闭弹窗时，重置表单
      this.$refs.ruleForm.resetFields()
    },
    checkAuthor (rule, value, callback) {
      if(value.length > 10 || value.length < 2) {
        return callback(new Error('作者名在2~10个字之间噢～'))
      } else {
        callback()
      }
    },
    checkContent (rule, value, callback) {
      if(value.length > 20 || value.length < 2) {
        return callback(new Error('作者名在2~20个字之间噢～'))
      } else {
        callback()
      }
    }
  },
}
</script>

<style lang="less" scoped>
  .input-item {
    width: 460px;
  }
</style>