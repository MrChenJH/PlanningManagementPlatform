import Cookies from 'js-cookie'

const app = {
  state: {
    Data:[
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd1:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd2:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd3:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false}, 
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd4:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd5:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd6:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false}, 
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd7:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false}, 
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd8:new Date("2018-9-20"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd9:new Date("2018-9-25"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd10:new Date("2018-9-30"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd11:new Date("2018-10-1"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd12:new Date("2018-10-6"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"办公室",jhlb:"市区联动区域领域科技支撑",nd13:new Date("2018-10-11"),state:"",createTime:"",creatorName:"admin",edit:false},

      {cs:"人事教育处",jhlb:"软科学第一批",nd1:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd2:new Date("2018-9-6"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd3:new Date("2018-9-7"),state:"",createTime:"",creatorName:"admin",edit:false}, 
      {cs:"人事教育处",jhlb:"软科学第一批",nd4:new Date("2018-9-8"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd5:new Date("2018-9-9"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd6:new Date("2018-9-10"),state:"",createTime:"",creatorName:"admin",edit:false}, 
      {cs:"人事教育处",jhlb:"软科学第一批",nd7:new Date("2018-9-19"),state:"",createTime:"",creatorName:"admin",edit:false}, 
      {cs:"人事教育处",jhlb:"软科学第一批",nd8:new Date("2018-9-20"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd9:new Date("2018-9-25"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd10:new Date("2018-9-30"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd11:new Date("2018-10-1"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd12:new Date("2018-10-6"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第一批",nd13:new Date("2018-10-11"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第二批",nd1:new Date("2018-9-1"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第二批",nd2:new Date("2018-9-6"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第二批",nd3:new Date("2018-9-7"),state:"",createTime:"",creatorName:"admin",edit:false}, 
      {cs:"人事教育处",jhlb:"软科学第二批",nd4:new Date("2018-9-8"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第二批",nd5:new Date("2018-9-9"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第二批",nd6:new Date("2018-9-10"),state:"",createTime:"",creatorName:"admin",edit:false}, 
      {cs:"人事教育处",jhlb:"软科学第二批",nd7:new Date("2018-9-19"),state:"",createTime:"",creatorName:"admin",edit:false}, 
      {cs:"人事教育处",jhlb:"软科学第二批",nd8:new Date("2018-9-20"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第二批",nd9:new Date("2018-9-25"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第二批",nd10:new Date("2018-9-30"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第二批",nd11:new Date("2018-10-1"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第二批",nd12:new Date("2018-10-6"),state:"",createTime:"",creatorName:"admin",edit:false},
      {cs:"人事教育处",jhlb:"软科学第二批",nd13:new Date("2018-10-11"),state:"",createTime:"",creatorName:"admin",edit:false},
    ],
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
     
    },
    device: 'desktop'
  },
  mutations: {
     AData:(state,objs)=>{
      state.Data=[...state.Data,...objs]
     },
      UData:(state,objs)=>{
      state.Data=[...state.Data,...objs]
     },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
