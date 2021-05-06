<!--
 * @Author: wangshan
 * @Date: 2021-04-30 20:03:36
 * @LastEditors: wangshan
 * @LastEditTime: 2021-04-30 21:00:15
 * @Description: 
-->
<template>
  <div class="login-container">
    <a-row type="flex">
      <a-col :span="24" class="height-100">
        <div class="bg"></div>
      </a-col>
    </a-row>
    <div class="login">
        <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules"  :wrapperCol="{span:24}" style="width: 300px" >
          <a-form-model-item has-feedback prop="user">
            <a-input v-model="ruleForm.user" > 
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item has-feedback prop="pass">
            <a-input-password v-model="ruleForm.pass" placeholder="input password">
              <a-icon slot="prefix" type="unlock" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="submitForm('ruleForm')" style="width: 100%">
              登陆
            </a-button>
          </a-form-model-item>
        </a-form-model>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Row, Col, FormModel, Input, Button, Icon } from 'ant-design-vue'
import api from '@/api/api'
const { Item } = FormModel
const { Password } = Input
@Component({
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-form-model': FormModel,
    'a-form-model-item': Item,
    "a-input": Input,
    'a-input-password': Password,
    'a-button': Button,
    'a-icon': Icon
  }
})
export default class Login extends Vue {
  // * Data
  Login = 'login page'
  ruleForm = {
    user: '',
    pass: ''
  }

  rules = {
    user: [
      {
        required: true, message: '输入账号', trigger: 'blur'
      }
    ],
    pass: [
      {
        required: true, message: '密码必须', trigger: 'blur'
      }
    ]
  }

  // prototype
  $refs!: {
    ruleForm: FormModel
  }

  $router!: {
    push(parm: Record<string, unknown>): void
  }

  // * Methods
  submitForm ():void {
    this.$refs.ruleForm.validate(valid => {
      if (valid) {
        this.$req(api.count.login)
        this.$router.push({ path: '/home' })
      } else {
        return false
      }
    })
  }
}
</script>
<style lang="less" scoped>
.login-container{
  position: relative;
  & .login{
    position: absolute;
    top: 0;
    right: 0;
    width: 600px;
    height: 100%;
    background: rgba(25, 138, 204, .8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.bg{
  width: auto;
  height: 100vh;
  background: url('../../assets/bg.jpg') no-repeat center / cover;
}
</style>
