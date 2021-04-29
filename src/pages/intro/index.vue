<template>
  <div id="pg-index">
    <Header/>
    <div class="kaer-home-banner">
      <div class="fd-home-banner-content">
        <div class="fd-home-banner-content-info">
          <h1 class="" style="transform: translate(0px, 0px); opacity: 1;">
            极简制作，一键呈现
          </h1>
          <p class="" style="transform: translate(0px, 0px); opacity: 1;">
            海量组件、模板，随意使用<br/>
            支持自定义开发组件、模板，满足不同场景的业务诉求
          </p>
          <div class="" style="transform: translate(0px, 0px); opacity: 1;">
            <router-link to="/dashboard" data-external="true">
              <button type="button" class="fdAnt-btn fd-guide-btn">
                <span>开始使用</span>
              </button>
            </router-link>
          </div>
        </div>
        <div class="fd-home-banner-content-img"></div>
      </div>
      <i class="fd-home-banner-bottom"></i>
    </div>
    <div class="kaer-home-intro">
      <h2>
        <strong>快速、简单、易用的可视化搭建平台</strong>
      </h2>
      <p>
        零门槛快速搭建、快速投放。数据实时回流，方便及时快速调整投放策略&方案
      </p>
      <div
          class="wow animate__fadeInUp kaer-home-intro-img"
          data-wow-duration="1s"
          data-wow-offset="100"
      />
    </div>
    <div class="kaer-feat">
      <h2
          data-wow-duration="1s"
          data-wow-offset="300"
          class="kaer-subtitle wow animate__fadeInUp"
      >
        功能特性<i></i>
      </h2>
      <section>
        <div
            data-wow-duration="1s"
            data-wow-offset="300"
            class="fd-home-feat-intro wow animate__fadeInLeft"
        >
          <i class="fd-home-icon fd-home-icon-1"></i>
          <h4>精选模板</h4>
          <p>提供了丰富的精选模板，覆盖众多场景，无需任何编程和设计经验，即可拥有一个专业的网站。</p>
        </div>
        <div
            data-wow-duration="1s"
            data-wow-offset="300"
            class="fd-home-feat-img fd-home-feat-img-1 wow animate__fadeInRight"
        >
          <i class="fd-home-feat-img-1-1"></i>
          <i class="fd-home-feat-img-1-2"></i>
          <i class="fd-home-feat-img-1-3"></i>
          <i class="fd-home-feat-img-1-4"></i>
        </div>
      </section>
      <section>
        <div
            data-wow-duration="1s"
            data-wow-offset="300"
            class="fd-home-feat-intro wow animate__fadeInLeft"
        >
          <i class="fd-home-icon fd-home-icon-3"></i>
          <h4>轻松拖拽</h4>
          <p>基于组件的自由搭建，所见即所得的站点内容编辑，自定义站点搭建，满足品牌个性化需求。</p>
        </div>
        <div
            data-wow-duration="1s"
            data-wow-offset="350"
            class="fd-home-feat-img fd-home-feat-img-3 wow animate__fadeInRight"
        >
          <i class="fd-home-feat-img-3-1"></i>
          <i class="fd-home-feat-img-3-2"></i>
          <i class="fd-home-feat-img-3-3"></i>
          <i class="fd-home-feat-img-3-4"></i>
        </div>
      </section>
      <section>
        <div
            data-wow-duration="1s"
            data-wow-offset="300"
            class="fd-home-feat-intro wow animate__fadeInLeft"
        >
          <i class="fd-home-icon fd-home-icon-5"></i>
          <h4>互动营销</h4>
          <p>通过各种插件，快速搭建线上互动场景，如：抽奖、报名、问卷、小游戏等，增加站点黏性，提升转化效果。</p>
        </div>
        <div
            data-wow-duration="1s"
            data-wow-offset="350"
            class="fd-home-feat-img fd-home-feat-img-5 wow animate__fadeInRight"
        >
          <i class="fd-home-feat-img-5-1"></i>
          <i class="fd-home-feat-img-5-2"></i>
          <i class="fd-home-feat-img-5-3"></i>
          <i class="fd-home-feat-img-5-4"></i>
          <i class="fd-home-feat-img-5-5"></i>
          <i class="fd-home-feat-img-5-6"></i>
        </div>
      </section>
      <div class="fd-site-step">
        <div class="fd-step-content">
          <ul>
            <li class="fd-step-content-item">
              <i class="fd-site-step-icon fd-site-step-icon-2"></i>
              <h4>1. 选择模板</h4>
              <p>新建站点时，选择一个模板，定义站点名称和路径</p>
            </li>
            <li class="fd-step-content-item">
              <i class="fd-site-step-icon fd-site-step-icon-3"></i>
              <h4>2. 编辑内容</h4>
              <p>根据站点功能和风格需要，添加页面、组件和填写页面内容</p>
            </li>
            <li class="fd-step-content-item">
              <i class="fd-site-step-icon fd-site-step-icon-4"></i>
              <h4>3. 发布站点</h4>
              <p>预览确认无误后，提交站点发布并获得站点地址</p></li>
          </ul>
        </div>
        <div class="fd-site-step-start">
          <router-link to="/dashboard" data-external="true">
            <button type="button" class="fdAnt-btn fd-guide-btn">
              <span>开始使用</span>
            </button>
          </router-link>
        </div>
        <i class="fd-site-step-bg-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
import {WOW} from 'wowjs';
import Header from '@/components/header';


export default {
  setup() {
    new WOW().init();
  },
  components: {
    Header,
  }
}
</script>
<style lang="less">
#pg-index {
  width: 100%;
  background: #fff;
  overflow-x: hidden;

  .kaer-home-banner {
    position: relative;
    width: 100%;
    padding-top: 64px;
    height: 730px;
    background-color: #6260e1;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/lvdPpaBFEDyPtJdjOSqC.png);
    background-size: 1156px 295px;
    background-repeat: no-repeat;
    background-position: left 414px;
  }

  .fd-home-banner-content {
    z-index: 1;
    position: relative;
    width: 1150px;
    height: 100%;
    margin: auto;
  }

  .fd-home-banner-content-img {
    position: absolute;
    right: -50px;
    width: 709px;
    height: 422px;
    margin-top: 50px;
    background-image: url(../../assets/image/banner.png);
    background-size: 100% 100%;
  }

  .fd-home-banner-content-info {
    position: absolute;
    margin-top: 166px;

    h1 {
      height: 48px;
      margin-bottom: 22px;
      font-size: 40px;
      line-height: 48px;
      color: #fff;
    }

    p {
      opacity: .65;
      margin-bottom: 52px;
      font-size: 20px;
      line-height: 28px;
      color: hsla(0, 0%, 100%, .65);
    }
  }

  .fd-guide-btn.fdAnt-btn {
    font-size: 20px;
    line-height: 48px;
    color: #6260e1;
    height: 50px;
    width: 168px;
    text-align: center;
    font-weight: 500;
  }

  .fd-home-banner-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/mnbTFhbsJjjKbnuABBid.png);
    background-size: 100% 100%;
  }

  .kaer-home-intro {
    text-align: center;
    margin-bottom: 80px;

    h2 {
      margin-bottom: 16px;
      font-size: 28px;
      line-height: 36px;
      color: #000;
    }

    p {
      opacity: .45;
      margin-bottom: 72px;
      font-size: 20px;
      line-height: 28px;
      color: #000;
    }

    .kaer-home-intro-img {
      width: 1040px;
      height: 578px;
      margin: 0 auto;
      box-shadow: 8px 8px 80px rgba(0, 0, 0, .15);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/XDRgdweMoqSasVzsDSES.png);
      background-size: 100% 100%;
    }
  }

  .kaer-feat {
    .kaer-subtitle {
      position: relative;
      font-size: 28px;
      line-height: 36px;
      color: #000;
      text-align: center;
      margin-bottom: 27px;

      i {
        display: block;
        position: absolute;
        bottom: -24px;
        left: 50%;
        margin-left: -16px;
        width: 32px;
        border-bottom: 3px solid #6260e1;
        border-radius: 6px;
      }
    }

    section {
      display: flex;
      align-items: center;
      width: 1040px;
      margin: 0 auto 180px;

      .fd-home-feat-intro {
        flex: none;
        width: 352px;
      }
    }

    .fd-home-icon-1 {
      background-position: -10px -10px;
    }

    .fd-home-icon-3 {
      background-position: -162px -10px;
    }

    .fd-home-icon-5 {
      background-position: -314px -10px;
    }

    .fd-home-icon {
      width: 56px;
      height: 56px;
      margin-bottom: 24px;
      display: inline-block;
    }

    .fd-home-icon, .fd-site-step-icon {
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/YjGPYCcFoVFhERIOXGZr.png);
      background-size: 780px 100px;
    }

    h4 {
      margin-bottom: 16px;
      font-weight: 400;
      font-size: 28px;
      line-height: 36px;
      color: #000;
    }

    p {
      font-size: 18px;
      line-height: 30px;
      color: rgba(0, 0, 0, .65);
    }
  }

  .fd-home-feat-img-1 {
    width: 522px;
    height: 490px;
    margin-top: 80px;
    margin-left: 158px;

    &-1 {
      z-index: 10;
      top: 56px;
      left: 117px;
      width: 260px;
      height: 443px;
      box-shadow: 4px 24px 100px rgba(0, 0, 0, .15);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/HJRfsSVKqSOdnCCBZTdI.png);
      background-size: 100% 100%;
    }

    &-2 {
      z-index: 4;
      top: 160px;
      left: 0;
      width: 276px;
      height: 233px;
      box-shadow: 4px 4px 20px rgba(0, 0, 0, .05);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/PLYifOOqJiivdUJUUeWs.png);
      background-size: 100% 100%;
    }

    &-3 {
      z-index: 8;
      top: 0;
      left: 232px;
      width: 290px;
      height: 260px;
      box-shadow: 4px 4px 20px rgba(0, 0, 0, .05);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/UCzzHWTillHUawrVPNfU.png);
      background-size: 100% 100%;
    }

    &-4 {
      z-index: 6;
      top: 257px;
      left: 208px;
      width: 276px;
      height: 144px;
      box-shadow: 4px 4px 20px rgba(0, 0, 0, .05);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/CeXOjBlGqltuCpMwZiuE.png);
      background-size: 100% 100%;
    }
  }

  .fd-home-feat-img-3 {
    width: 600px;
    height: 416px;
    margin-left: 78px;

    &-1 {
      z-index: 10;
      top: 150px;
      left: 104px;
      width: 270px;
      height: 160px;
      box-shadow: 3px 6px 40px rgba(0, 0, 0, .08);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/JKLbfClxovxtCRblKMsd.png);
      background-size: 100% 100%;
    }

    &-2 {
      z-index: 8;
      top: 174px;
      left: 80px;
      width: 270px;
      height: 160px;
      box-shadow: 3px 16px 40px rgba(0, 0, 0, .08);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/vxZRGtIbKZRfdaAtuzgu.png);
      background-size: 100% 100%;
    }

    &-3 {
      z-index: 6;
      top: 0;
      left: 264px;
      width: 217px;
      height: 392px;
      box-shadow: 3px 6px 40px rgba(0, 0, 0, .08);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/AxeNZnhiXNkEsTdvqbCt.png);
      background-size: 100% 100%;
    }

    &-4 {
      z-index: 4;
      top: 42px;
      left: 0;
      width: 600px;
      height: 374px;
      box-shadow: 4px 24px 100px rgba(0, 0, 0, .15);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/DskSTLaxbkyTahFUpQOz.png);
      background-size: 100% 100%;
    }
  }

  .fd-home-feat-img-5 {
    width: 594px;
    height: 421px;
    margin-left: 84px;

    &-1 {
      z-index: 10;
      top: 288px;
      left: 30px;
      width: 96px;
      height: 96px;
      box-shadow: 3px 16px 40px rgba(0, 0, 0, .08);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/rqCeKRBmGZaZLwNZUdWs.png);
      background-size: 100% 100%;
    }

    &-2 {
      z-index: 10;
      top: 0;
      left: 450px;
      width: 108px;
      height: 108px;
      box-shadow: 3px 16px 40px rgba(0, 0, 0, .08);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/EXCuIRTRECHkxFwKwKyV.png);
      background-size: 100% 100%;
    }

    &--3 {
      z-index: 8;
      top: 64px;
      left: 0;
      width: 64px;
      height: 64px;
      box-shadow: none;
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/sVGCwDEQXdShcQwIYjnW.png);
      background-size: 100% 100%;
    }

    &-4 {
      z-index: 8;
      top: 36px;
      left: 116px;
      width: 375px;
      height: 386px;
      box-shadow: 4px 24px 100px rgba(0, 0, 0, .15);
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/oItEhVlQyzgiYkyDuBQc.png);
      background-size: 100% 100%;
    }

    &-5 {
      z-index: 6;
      top: 132px;
      left: 481px;
      width: 58px;
      height: 58px;
      box-shadow: none;
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/RMMrWnTxIcLRfXnpBVmP.png);
      background-size: 100% 100%;
    }

    &-6 {
      z-index: 6;
      top: 220px;
      left: 556px;
      width: 40px;
      height: 40px;
      box-shadow: none;
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/cywxbiaGrDRCcdyYNdOm.png);
      background-size: 100% 100%;
    }
  }

  .fd-home-feat-img {
    flex: 1 1;
    position: relative;

    i {
      display: block;
      position: absolute;
      border-radius: 4px;
    }
  }

  .fd-site-step {
    position: relative;
    padding: 132px 0;
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/HcrvRVZXbhfSdTYyByvu.png);
    background-size: 487px 576px;
    background-color: #6260e1;
    background-repeat: no-repeat;
    background-position: 0 0;
    .fd-step-content {
      z-index: 1;
      position: relative;
      width: 1106px;
      margin: 0 auto;
      padding-bottom: 80px;
      ul {
        display: -webkit-flex;
        display: flex;
        font-size: 0;
        -webkit-justify-content: center;
        justify-content: center;
        &:last-child {
          margin-right: 0;
        }
      }
      .fd-step-content-item {
        position: relative;
        -webkit-flex: none;
        flex: none;
        width: 198px;
        margin-right: 104px;
        text-align: center;
        h4 {
          margin-bottom: 20px;
          font-size: 20px;
          line-height: 28px;
          color: #fff;
        }
        p {
          margin-bottom: 0;
          font-size: 14px;
          line-height: 22px;
          color: #fff;
        }
        i {
          margin-bottom: 12px;
        }
        &:before {
          content: "";
          display: block;
          position: absolute;
          top: 110px;
          right: -96px;
          width: 90px;
          height: 1px;
          background-image: linear-gradient(90deg,hsla(0,0%,100%,0),#fff);
        }
        &:after {
          content: "";
          display: block;
          position: absolute;
          top: 110px;
          right: -99px;
          margin-top: -1px;
          width: 3px;
          height: 3px;
          border-radius: 100%;
          background-color: #fff;
        }
        &:last-child {
          &:before,&:after {
            display: none;
          }
        }
      }
    }
    .fd-site-step-icon {
      width: 80px;
      height: 80px;
    }
    .fd-home-icon, .fd-site-step-icon {
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/YjGPYCcFoVFhERIOXGZr.png);
      background-size: 780px 100px;
      display: inline-block;
    }
    .fd-site-step-icon-2 {
      background-position: -490px -10px;
    }
    .fd-site-step-icon-3 {
      background-position: -590px -10px;
    }
    .fd-site-step-icon-4 {
      background-position: -690px -10px;
    }
    .fd-site-step-start {
      z-index: 1;
      position: relative;
      text-align: center;
      .fd-guide-btn.fdAnt-btn {
        font-size: 20px;
        line-height: 48px;
        color: #6260e1;
        height: 48px;
        width: 168px;
        text-align: center;
        font-weight: 500;
        span {
          display: inline-block;
          pointer-events: none;
        }
      }
    }
    .fd-site-step-bg-right {
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      width: 471px;
      height: 520px;
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/mASBWhMvLVPaATbgimmA.png);
      background-size: 100% 100%;
    }
  }
}
</style>
