<template lang="pug">
  div.end-login
    div.login-bj(:style="bgImg")
      div.login-content.flex.justify-center.h100
        div.login-from.bg-white
          div.private-title 登录
          a-form-model.form-model.mt4.mb36(
            ref="ruleForm",
            :model="form",
            :rules="rules")
            a-form-model-item(ref="username", prop="username")
              a-input(
                v-model.trim="form.username",
                placeholder="请输入账号",
                size="large",
                allowClear)
                img.login-icon.mr1(slot="prefix", :src="userIcon")
            a-form-model-item(ref="password" prop="password")
              a-input-password(
                ref="passwords"
                v-model.trim="form.password",
                placeholder="请输入登录密码",
                size="large",
                allowClear,
                @keyup.enter="onKeyEnter")
                img.login-icon.mr1(slot="prefix", :src="passwordIcon")
          div.login-btn.flex.justify-center.mt3
            a-button(
              type="primary",
              size="large",
              @click="onLogin",
              :loading="loginLoading",
              block) 立即登录
          div.flex
            div.config.flex.justify-between.mt2.mb60
              a-checkbox(:checked="dealLogin", @change="onDealChange")
                span 同意并遵守
                a 《服务协议》
                span 和
                a 《隐私条款》
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FormModel } from "ant-design-vue";
@Component({
	components: {}
})
export default class Login extends Vue {
	loginLoading = false;
	bgImg = {
		backgroundImage: "url(" + require("../assets/login-bj.png") + ")",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center",
		alignItems: "center",
		display: "flex",
		justifyContent: "center",
		minHeight: "720px"
	};
	userIcon = require("../assets/lg-user.png");
	passwordIcon = require("../assets/lg-password.png");
	//- 隐私政策默认不打勾
	dealLogin = false;
	autoLogin: any = false;
	// 密码登录表单部分
	form: any = {
		username: "",
		password: ""
	};
	rules = {
		username: [
			{
				required: true,
				message: "请输入您的账号",
				trigger: "change"
			}
		],
		password: [
			{
				required: true,
				message: "请输入您的登录密码",
				trigger: "change"
			}
		]
	};

	get clientH() {
		const clientH = document.documentElement || document.body;
		return clientH.clientHeight;
	}

	// 是否同意使用协议
	onDealChange(e) {
		this.dealLogin = e.target.checked;
	}

	// 登录
	onLogin() {
		if (!this.dealLogin) {
			this.$message.warning("请先勾选同意并遵守《服务协议》和《隐私政策》");
			return;
		}
		(this.$refs.ruleForm as FormModel).validate(valid => {
			if (valid) {
				console.log("form", this.form);
				if (this.form.username == "admin") {
					this.toPage("END");
				} else {
					this.toPage("FRONT");
				}
			} else {
				return false;
			}
		});
	}

	toPage(type) {
		window.location.replace(`${this.$HOST[type]}`);
	}
}
</script>

<style lang="stylus" scoped>
.end-login {
  flex: 1;
  height: 100%;
  .login-bj {
    padding: 64px 0;
    flex: 1;
    width: 100%;
    height: 100%;
  }
  .login-content {
    height: auto;
    align-items: flex-start;
    margin-top: 40px;
  }
  .mt80 {
    margin-top: 80px;
  }
}
.login-title {
  margin-right: 170px;
  .title {
    font-size: 28px;
    line-height: 46px;
    font-weight: bold;
    .pt {
      color: #5E7CE0;
    }
  }
  .banner {
    margin-top: 60px;
    width: 496px;
  }
}
.private-title {
  margin-bottom: 36px;
  font-size: 16px;
  height: 48px;
  line-height: 46px;
  text-align: center;
  border-bottom: 1px solid #d9d9d9;
}
.login-from {
  width: 428px
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  .config {
    padding: 0px 40px;
    font-size: 12px;
    .ant-checkbox-wrapper {
      color: #252B3A;
      font-size: 12px;
    }
    a {
      color: #7693F5;
    }
    a:hover {
      color: #7693F5;
    }
  }
  .login-icon {
    width: 16px;
    height: 16px;
  }
  .form-model, .login-btn {
    padding: 0px 40px;
  }
  .forget-password {
    float: right;
    a {
      color: #252B3A;
    }
    a:hover {
      color: #7693F5;
    }
  }
  .mb60 {
    margin-bottom: 60px;
  }
  .mb36 {
    margin-bottom: 36px;
  }
}
</style>
