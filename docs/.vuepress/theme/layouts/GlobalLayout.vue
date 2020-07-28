<template>
    <div id="global-layout">
        <component :is="layout"/>
        <footer>
		  <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
            鄂ICP备20012934号-1&nbsp;|&nbsp;
          </p>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011502001239" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
            <img src="/beian.png" style="float:left;"/>
            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
              鄂公网安备 42011502001239号
            </p>
          </a>
          <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">
            &nbsp;|&nbsp;&copy;&nbsp;MIT&nbsp;&nbsp;2020 Kelvin Yu
          </p>
        </footer>
    </div>
</template>

<script>
export default {
    computed: {
        layout() {
            if (this.$page.path) {
                if (this.$frontmatter.layout) {
                    return this.$frontmatter.layout
                }
                return 'Layout'
            }
            return 'NotFound'
        }
    }
}
</script>

<style scoped>
footer {
    background-color: white;
    border-top: 1px solid #eaecef;
    width: 100%;
    height: 3rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}
</style>