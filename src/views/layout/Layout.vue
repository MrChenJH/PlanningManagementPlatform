<template> 
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10"  style="font-size: 26px;padding-left: 40px;">
				{{collapsed?'':sysName}}
			</el-col>
		    <el-col :span="14" > 
				<span  style="float:right;margin-right:15px;padding-left:5px;">{{sysUserName}}</span> 
				<el-dropdown trigger="hover" style="float:right;margin-right:10px">
				    <span class="el-dropdown-link userinfo-inner"><img :src="sy"  style="width:45px;height:45px;;border-radius: 30px;margin-top:5px;"/> </span>
					<el-dropdown-menu slot="dropdown">
					    <el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside style="width:200px;flex: 0 0 200px">
              <Sidebar class="sidebara"></Sidebar>
		    </aside>
			<section class="content-container">
				<div class="grid-content"> 
				     <el-col :span="24" >
						<div> 
							<template> 
								<div>
									<el-row :gutter="20">
									  <el-col :span="24" class="grid-content bgpurple1">  
									   <Breadcrumb></Breadcrumb>
									  </el-col>
									</el-row>
									</div>
							</template>
                         </div>	
					 </el-col>
				
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
						<router-view></router-view>
						</transition>
					</el-col>
				
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	 import { mapGetters } from 'vuex'
     import Breadcrumb from '@/components/Breadcrumb'
	 import { Sidebar } from './components' 
	 import Hamburger from '@/components/Hamburger' 
	 import sy from '@/assets/404_images/sy.jpg'
	  export default {
		data() {
			return {
				sy,
				sysName:'科研计划管理平台',
				collapsed:false,
				sysUserName: 'admin',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		components:{
		  Sidebar,
		  Hamburger,
		  Breadcrumb
		},
		methods: { 
			 toggleSideBar() { 
                 this.$store.commit('TOGGLE_SIDEBAR');
			     this.collapsed=!this.sidebar.opened;
             },
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
			
                  this.$store.dispatch('LogOut').then(() => {
                     location.reload() // 为了重新实例化vue-router对象 避免bug
                      })
 

			},
		    showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			 }
			 },
			 
			 computed: {
               ...mapGetters([
							'sidebar',
							'name'
                           ])
             },
			 
			 mounted() {
			    //  this.sysUserName=this.name

		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars'; 

    @import "src/styles/mixin.scss";
	
  .bgpurple1 {
    background: rgba(245, 245, 245, 1);
  }

	.hamburger-container{
    	margin-left: 10px
	}

	.el-col{
		    border-radius: 0px;
	}
	.sidebara{ 
		 background: rgb(48, 65, 86);
     	width: 100%;
		height: 100%;

	}
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>