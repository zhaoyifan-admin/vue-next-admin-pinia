<template>
  <el-form size="large" class="login-content-form" ref="loginFormRef" :model="ruleForm" :rules="loginRules">
    <el-form-item class="login-animation0" prop="tenantCode">
      <el-input type="number" :placeholder="$t('message.account.accountPlaceholder0')"
                v-model="ruleForm.tenantCode" clearable autocomplete="off">
        <template #prefix>
          <connection-box theme="outline" size="16" fill="#1990FF" strokeLinejoin="miter" strokeLinecap="square"/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation1" prop="userName">
      <el-input type="text" :placeholder="$t('message.account.accountPlaceholder1')" v-model="ruleForm.userName"
                clearable autocomplete="off">
        <template #prefix>
          <user theme="outline" size="16" fill="#1990FF" strokeLinejoin="miter" strokeLinecap="square"/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation2" prop="password">
      <el-input
          :type="isShowPassword ? 'text' : 'password'"
          :placeholder="$t('message.account.accountPlaceholder2')"
          v-model="ruleForm.password"
          clearable
          autocomplete="off"
      >
        <template #prefix>
          <unlock theme="outline" size="16" fill="#1990FF" strokeLinejoin="miter" strokeLinecap="square"/>
        </template>
        <template #suffix>
          <preview-open v-if="isShowPassword" theme="outline" size="16" fill="#1990FF" strokeLinejoin="miter"
                        strokeLinecap="square" @click="isShowPassword = !isShowPassword"/>
          <preview-close v-else theme="outline" size="16" fill="#1990FF" strokeLinejoin="miter" strokeLinecap="square"
                         @click="isShowPassword = !isShowPassword"/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation4">
      <el-button type="primary" class="login-content-submit" @click="onSignIn" :loading="loading.signIn">
        <span>{{ $t('message.account.accountBtnText') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
  <Verify
      :captchaType="'blockPuzzle'"
      @success="verifySuccess"
      @close="close"
      ref="verify"/>
</template>

<script lang="ts">
import {toRefs, reactive, defineComponent, computed, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {ElMessage, ElNotification} from 'element-plus';
import {useI18n} from 'vue-i18n';
import Cookies from 'js-cookie';
import {storeToRefs} from 'pinia';
import {useThemeConfig} from '/@/stores/themeConfig';
import {initFrontEndControlRoutes} from '/@/router/frontEnd';
import {initBackEndControlRoutes} from '/@/router/backEnd';
import {getStore, Session, setStore} from '/@/utils/storage';
import {formatAxis} from '/@/utils/formatTime';
import {NextLoading} from '/@/utils/loading';
import {useUserInfo} from '/@/stores/userInfo';
import {User, Unlock, PreviewOpen, PreviewClose, ConnectionBox} from '@icon-park/vue-next';
// 图片滑块组件
import Verify from '/@/components/verifition/Verify.vue';

import {tenantCode} from '/@/api/login';

export default defineComponent({
  name: 'loginAccount',
  components: {
    Verify,
    User,
    Unlock,
    PreviewOpen,
    PreviewClose,
    ConnectionBox
  },
  setup() {
    const {t} = useI18n();
    const verify = ref();
    const loginFormRef = ref();
    const storesThemeConfig = useThemeConfig();
    const {themeConfig} = storeToRefs(storesThemeConfig);
    const route = useRoute();
    const router = useRouter();
    const store = useUserInfo();
    const state = reactive({
      isShowPassword: false,
      ruleForm: {
        code: '',
        tenantCode: getStore('tenantCode') || "",
        userName: '',
        password: '',
        randomStr: "blockPuzzle",
      },
      loading: {
        signIn: false,
      },
    });
    // 自定义验证规则
    const validatetenantCode = (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error('租户号不能为空'))
      } else {
        tenantCode(state.ruleForm.tenantCode).then((res) => {
          let result: any = res;
          if (result.code === 0) {
            setStore({name: "tenantId", content: result.data.id, type: 'session'});
            callback();
          } else {
            callback(new Error('租户号不存在'))
          }
        }).catch((error) => {
          console.log(error)
          callback(new Error('租户号不存在'));
        })
      }
    }
    // 定义校验规则
    const loginRules = reactive({
      tenantCode: [
        {required: true, message: '租户号不能为空', trigger: 'blur'},
        {validator: validatetenantCode, trigger: 'blur'},
      ],
      userName: [
        {required: true, message: '用户名不能为空', trigger: 'blur'},
      ],
      password: [
        {required: true, message: '密码不能为空', trigger: 'blur'},
      ]
    })
    // 时间获取
    const currentTime = computed(() => {
      return formatAxis(new Date());
    });
    // 登录
    const onSignIn = async () => {
      loginFormRef.value.validate(async (valid: any) => {
        if (valid) {
          verify.value.show();
          state.loading.signIn = true;
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    };
    // 登录成功后的跳转
    const signInSuccess = () => {
      // 初始化登录成功时间问候语
      let currentTimeInfo = currentTime.value;
      // 登录成功，跳到转首页
      // 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
      if (route.query?.redirect) {
        router.push({
          path: <string>route.query?.redirect,
          query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
        });
      } else {
        router.push('/');
      }
      // 登录成功提示
      // 关闭 loading
      state.loading.signIn = true;
      const signInText = t('message.signInText');
      ElMessage.success(`${currentTimeInfo}，${signInText}`);
      // 添加 loading，防止第一次进入界面时出现短暂空白
      NextLoading.start();
    };
    const close = (params: any) => {
      state.loading.signIn = params;
      ElNotification({
        title: t('message.account.verifyTips'),
        message: t('message.account.verifyWarning'),
        type: 'warning',
      })
    };
    const verifySuccess = async (params: any) => {
      state.ruleForm.code = params.captchaVerification;
      store.LoginByUsername(state.ruleForm).then(async () => {
        state.loading.signIn = true;
        // 存储 token 到浏览器缓存
        Session.set('token', Math.random().toString(36).substr(0));
        // 模拟数据，对接接口时，记得删除多余代码及对应依赖的引入。用于 `/src/stores/userInfo.ts` 中不同用户登录判断（模拟数据）
        Cookies.set('userName', state.ruleForm.userName);
        if (!themeConfig.value.isRequestRoutes) {
          // 前端控制路由，2、请注意执行顺序
          await initFrontEndControlRoutes();
          signInSuccess();
        } else {
          // 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
          // 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
          await initBackEndControlRoutes();
          // 执行完 initBackEndControlRoutes，再执行 signInSuccess
          signInSuccess();
        }
      }).catch((error) => {
        console.log(error)
        state.loading.signIn = false;
      });
    };
    return {
      store,
      verify,
      loginRules,
      loginFormRef,
      onSignIn,
      close,
      verifySuccess,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang="scss">
.login-content-form {
  margin-top: 20px;
  @for $i from 1 through 4 {
    .login-animation#{$i} {
      opacity: 0;
      animation-name: error-num;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-delay: calc($i/10) + s;
    }
  }

  .login-content-password {
    display: inline-block;
    width: 20px;
    cursor: pointer;

    &:hover {
      color: #909399;
    }
  }

  .login-content-code {
    width: 100%;
    padding: 0;
    font-weight: bold;
    letter-spacing: 5px;
  }

  .login-content-submit {
    width: 100%;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 15px;

    span {
      color: #FFFFFF;
      font-weight: bold;
    }
  }
}
</style>
