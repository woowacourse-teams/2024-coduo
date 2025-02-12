!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="418e8083-3843-4367-b7dc-b740ff69bf69",e._sentryDebugIdIdentifier="sentry-dbid-418e8083-3843-4367-b7dc-b740ff69bf69")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"9731194729488b17ff41d794d9310819fca06014"},(self.webpackChunkcoduo_frontend=self.webpackChunkcoduo_frontend||[]).push([[272],{8272:(e,t,r)=>{r.r(t),r.d(t,{default:()=>hr});var n=r(4848),i=r(6540),o=r(7767),s=r(7418),a=r(9197),l=r(6638),c=r(563),d=r(7351),m=r(1711),h=r(656),p=r(4998),u=r(7594),g=r(7581);const f=g.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 1rem 0;
`,x=g.Ay.h1`
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,y=g.Ay.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,b=g.Ay.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,j=g.Ay.p`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-size: ${({theme:e})=>e.fontSize.base};
`,$=g.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  height: 5.2rem;
  padding: 1rem 1rem 1rem 1.6rem;
  border-radius: 1rem;

  background-color: ${({theme:e})=>e.color.danger[10]};
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.light};
`,v=g.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  p {
    color: ${({theme:e})=>e.color.black[300]};
    font-size: ${({theme:e})=>e.fontSize.sm};
  }
`,w=({isOpen:e,close:t,accessCode:r})=>{const o=(0,i.useRef)(new Audio(l.bB)),{addToast:s}=(0,m.A)(),[,g]=(0,p.A)(),{buttonRef:w}=(0,h.A)(e);return(0,n.jsxs)(d.a,{isOpen:e,close:t,size:"70rem",children:[(0,n.jsx)(d.a.CloseButton,{close:t}),(0,n.jsxs)(f,{children:[(0,n.jsx)(x,{children:"페어 프로그래밍을 시작하기 전에..."}),(0,n.jsxs)(y,{"aria-label":"페어 프로그래밍을 시작하기 전에 아래의 항목들을 체크해 주세요.",children:[(0,n.jsxs)(b,{children:[(0,n.jsxs)(j,{children:[(0,n.jsx)(a.CMH,{role:"presentation"}),"브라우저 알림을 허용하셨나요?"]}),(0,n.jsxs)($,{children:["브라우저 알림을 허용하지 않으면 타이머 종료 시 올바르게 알림을 제공할 수 없어요.",(0,n.jsx)(c.A,{width:"9rem",height:"3.2rem",color:"danger",borderRadius:"0.8rem",fontSize:u.w.fontSize.md,onClick:()=>{"granted"===Notification.permission?s({status:"SUCCESS",message:"알림 권한이 허용된 상태입니다."}):s({status:"ERROR",message:"알림 권한이 허용되지 않았습니다. 설정에서 권한을 허용해 주세요."})},children:"권한 확인"})]})]}),(0,n.jsxs)(b,{children:[(0,n.jsxs)(j,{children:[(0,n.jsx)(a.CMH,{role:"presentation"}),"사용 중인 기기의 소리가 켜져 있나요?"]}),(0,n.jsxs)($,{children:["사용 중인 기기의 소리가 꺼져 있다면 타이머 종료 시 알람 소리를 들으실 수 없어요.",(0,n.jsx)(c.A,{width:"9rem",height:"3.2rem",color:"danger",borderRadius:"0.8rem",fontSize:u.w.fontSize.md,onClick:()=>o.current.play(),children:"소리 확인"})]})]}),(0,n.jsxs)(b,{children:[(0,n.jsxs)(j,{children:[(0,n.jsx)(a.CMH,{role:"presentation"}),"페어룸 코드를 복사하셨나요?"]}),(0,n.jsxs)($,{children:["페어에게 페어룸 코드를 전달하여 페어룸에 들어올 수 있도록 해주세요.",(0,n.jsx)(c.A,{width:"9rem",height:"3.2rem",color:"danger",borderRadius:"0.8rem",fontSize:u.w.fontSize.md,onClick:()=>g(r),children:"코드 복사"})]})]})]}),(0,n.jsx)(d.a.Footer,{position:"CENTER",children:(0,n.jsxs)(v,{children:[(0,n.jsx)("p",{children:"모두 확인하셨나요?"}),(0,n.jsx)(c.A,{ref:w,width:"18rem",size:"lg",onClick:t,children:"시작하기"})]})})]})]})};var A=r(57);const k=g.Ay.div`
  display: flex;
  justify-content: ${({$isOpen:e})=>e?"space-between":"center"};
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  background-color: ${({theme:e})=>e.color.black[100]};

  transition: background-color 0.3s ease-out;

  cursor: pointer;
`,C=g.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
`,S=g.Ay.span`
  height: 2rem;

  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
`,z=g.Ay.span`
  font-size: ${({theme:e})=>e.fontSize.md};
`,O=({isOpen:e,accessCode:t})=>{const[,r]=(0,p.A)();return(0,n.jsxs)(k,{role:"button",$isOpen:e,onClick:()=>{r(t)},"aria-label":`페어룸 코드는 ${t}입니다. 클릭하시면 페어룸 코드가 클립보드에 복사됩니다.`,children:[e&&(0,n.jsxs)(C,{children:[(0,n.jsx)(S,{children:"방 코드"}),(0,n.jsx)(z,{children:t})]}),(0,n.jsx)(a.bTl,{size:"1.5rem",role:"presentation"})]})};var E=r(658),R=r(4703),D=r(1983);const N=g.i7`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
`,I=g.Ay.div`
  display: flex;
  align-items: center;

  position: relative;
  top: 0.1rem;

  width: fit-content;
  height: fit-content;

  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;

    transition: all 0.75s ease;
  }
`,M=g.AH`
  content: '';

  position: absolute;
  border-width: 0.8rem;
  border-style: solid;
  filter: drop-shadow(0 0.2rem 0.2rem rgb(0 0 0 / 30%));
`,T=g.Ay.div`
  display: none;

  position: absolute;
  z-index: ${D.M.TOOLTIP};

  width: fit-content;
  min-width: 20rem;
  padding: 1rem;
  border-radius: 0.5rem;

  background-color: ${({$color:e})=>e};
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 30%);
  color: white;
  font-size: ${({theme:e})=>e.fontSize.sm};
  line-height: 150%;
  text-align: center;
  word-break: keep-all;

  animation: ${N} 0.3s ease-in-out forwards;

  cursor: help;

  ${({$color:e,$direction:t})=>((e,t)=>{switch(e){case"top":return g.AH`
        bottom: 3.5rem;
        left: 50%;

        transform: translateX(-50%);

        &::before {
          ${M}
          top: 100%;
          left: 50%;

          border-color: ${t} transparent transparent transparent;

          transform: translateX(-50%);
        }
      `;case"bottom":return g.AH`
        top: 3.5rem;
        left: 50%;

        transform: translateX(-50%);

        &::before {
          ${M}
          bottom: 100%;
          left: 50%;

          border-color: transparent transparent ${t} transparent;

          transform: translateX(-50%);
        }
      `;case"left":return g.AH`
        top: 50%;
        right: 3.5rem;

        transform: translateY(-50%);

        &::before {
          ${M}
          top: 50%;
          left: 100%;

          border-color: transparent transparent transparent ${t};

          transform: translateY(-50%);
        }
      `;case"right":return g.AH`
        top: 50%;
        left: 3.5rem;

        transform: translateY(-50%);

        &::before {
          ${M}
          top: 50%;
          right: 100%;

          border-color: transparent ${t} transparent transparent;

          transform: translateY(-50%);
        }
      `}})(t,e)};
`,L=({message:e,direction:t="bottom",color:r=u.w.color.primary[900],children:i})=>(0,n.jsxs)(I,{role:"tooltip","aria-label":e,children:[i,(0,n.jsx)(T,{className:"tooltip",$color:r,$direction:t,children:e})]}),F=g.Ay.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  overflow: hidden;

  position: absolute;
  bottom: 0;

  width: 100%;
  height: 6rem;
  margin-top: auto;
  border-radius: 0 0 2rem 2rem;

  background-color: ${({theme:e,disabled:t})=>t?e.color.black[100]:e.color.danger[100]};
  color: ${({theme:e,disabled:t})=>t?e.color.black[400]:e.color.danger[500]};
  font-size: ${({theme:e})=>e.fontSize.base};
  text-overflow: ellipsis;
  white-space: nowrap;

  cursor: ${({disabled:e})=>e?"not-allowed":"pointer"};
`,P=(0,g.Ay)(L)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`,H=g.Ay.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`,U=({isOpen:e,openModal:t})=>{const{userStatus:r}=(0,R.A)(),i="SIGNED_IN"!==r;return(0,n.jsx)(F,{onClick:t,disabled:i,"aria-label":i?"로그인 후 페어룸을 종료할 수 있습니다. ":"클릭하시면 페어룸이 종료됩니다.",children:i?(0,n.jsx)(P,{message:"로그인 후 페어룸을 종료할 수 있습니다.",direction:"top",children:(0,n.jsxs)(H,{children:[(0,n.jsx)(E.Flv,{size:"1.5rem"}),e&&(0,n.jsx)("span",{children:"페어룸 종료하기"})]})}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(E.Flv,{size:"1.5rem"}),e&&(0,n.jsx)("span",{children:"페어룸 종료하기"})]})})};var q=r(1351),W=r(6872),_=r(6512),V=r(5617);const G=(0,g.Ay)(V.q.Header)`
  justify-content: ${({$isOpen:e})=>e?"space-between":"center"};

  padding: ${({$isOpen:e})=>e?"2rem 1rem 2rem 2rem":"0"};
`,B=(0,g.Ay)(_.m6W)`
  transform: rotate(${({$isOpen:e})=>e?0:180}deg);
  transition: transform 0.2s ease-in-out;
`,J=({isOpen:e,toggleOpen:t})=>(0,n.jsx)(G,{icon:e&&(0,n.jsx)(q.GvN,{color:u.w.color.primary[600],role:"presentation"}),title:e?"페어":"",$isOpen:e,children:(0,n.jsx)(W.A,{icon:(0,n.jsx)(B,{$isOpen:e}),size:"md",onClick:t,"aria-label":e?"목록 접기":"목록 열기"})}),Y=g.Ay.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;

  height: 6rem;
  padding: 0 1.6rem;

  border-bottom: 1px solid ${({theme:e})=>e.color.black[100]};
`,Z=g.Ay.span`
  width: 7rem;
  padding: 0.4rem 0.8rem;
  border-radius: 1.2rem;

  background-color: ${({theme:e,$role:t})=>"DRIVER"===t?e.color.primary[600]:e.color.secondary[500]};
  color: white;
  font-size: ${({theme:e})=>e.fontSize.sm};
  text-align: center;
`,X=g.Ay.span`
  overflow: hidden;

  font-size: ${({theme:e})=>e.fontSize.base};
  text-overflow: ellipsis;
  white-space: nowrap;
`,K=({isOpen:e,driver:t,navigator:r})=>(0,n.jsxs)("div",{children:[(0,n.jsxs)(Y,{"aria-label":`현재 드라이버는 ${t}입니다.`,children:[e&&(0,n.jsx)(Z,{$role:"DRIVER",children:"드라이버"}),(0,n.jsx)(X,{children:t})]}),(0,n.jsxs)(Y,{"aria-label":`현재 내비게이터는 ${r}입니다.`,children:[e&&(0,n.jsx)(Z,{$role:"NAVIGATOR",children:"내비게이터"}),(0,n.jsx)(X,{children:r})]})]});var Q=r(4976);const ee=g.Ay.div`
  display: flex;
  justify-content: ${({$isOpen:e})=>e?"space-between":"center"};
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  background-color: ${({theme:e})=>e.color.black[800]};

  transition: background-color 0.3s ease-out;

  cursor: pointer;
`,te=g.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
`,re=g.Ay.span`
  color: ${({theme:e})=>e.color.black[0]};
  font-size: ${({theme:e})=>e.fontSize.md};
`,ne=({isOpen:e,missionUrl:t})=>(0,n.jsx)(Q.N_,{to:t,target:"_blank","aria-label":"클릭하시면 미션 리포지토리로 이동합니다.",children:(0,n.jsxs)(ee,{$isOpen:e,children:[(0,n.jsx)("img",{src:l.qZ,alt:""}),e&&(0,n.jsxs)(te,{children:[(0,n.jsx)(re,{children:"미션 리포지토리로 이동"}),(0,n.jsx)(_.OQo,{size:"1.6rem",color:"white",role:"presentation"})]})]})});var ie=r(2298),oe=r(4700);const se=g.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  min-width: ${e=>e.$isOpen?"24rem":"6rem"};

  white-space: nowrap;

  transition: min-width 0.3s;
`,ae=({driver:e,navigator:t,missionUrl:r,accessCode:s})=>{const a=(0,o.Zp)(),[l,c]=(0,i.useState)(!0),{isModalOpen:d,openModal:m,closeModal:h}=(0,ie.A)(),{updatePairRoomStatusMutation:p}=(0,oe.A)();return(0,n.jsxs)(se,{$isOpen:l,"aria-label":"페어 목록",children:[(0,n.jsxs)(V.q,{children:[(0,n.jsx)(J,{isOpen:l,toggleOpen:()=>c(!l)}),(0,n.jsx)(O,{isOpen:l,accessCode:s}),""!==r&&(0,n.jsx)(ne,{isOpen:l,missionUrl:r}),(0,n.jsx)(K,{isOpen:l,driver:e,navigator:t}),(0,n.jsx)(U,{isOpen:l,openModal:m})]}),(0,n.jsx)(A.A,{isOpen:d,close:h,type:"SUCCESS",title:"정말 종료하시겠습니까?",subTitle:"페어룸을 종료해도 기록은 다시 확인할 수 있어요.",confirmText:"종료하기",onConfirm:()=>{p({accessCode:s},{onSuccess:()=>a(`/room/${s}/retrospectForm`,{state:{valid:!0}})})}})]})},le=g.Ay.div`
  display: flex;

  min-width: 60rem;
  min-height: 14rem;
`,ce=g.Ay.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;

  height: 100%;
  padding: 2rem;
`,de=g.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  width: 18rem;
  height: 9.4rem;
  padding: 1.6rem 2.4rem;
  border-radius: 2rem;
`,me=(0,g.Ay)(de)`
  background: linear-gradient(
    180deg,
    ${({theme:e})=>e.color.secondary[50]},
    ${({theme:e})=>e.color.secondary[200]}
  );
`,he=(0,g.Ay)(de)`
  background: linear-gradient(
    180deg,
    ${({theme:e})=>e.color.black[50]},
    ${({theme:e})=>e.color.black[300]}
  );
`,pe=g.Ay.p`
  font-size: ${({theme:e})=>e.fontSize.h2};
`,ue=g.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;

  p {
    font-size: ${({theme:e})=>e.fontSize.h4};
    font-weight: ${({theme:e})=>e.fontWeight.medium};
  }
`,ge=g.Ay.div`
  width: 8rem;
  padding: 0.4rem 0;
  border-radius: 10rem;

  color: ${({theme:e})=>e.color.black[0]};
  font-size: ${({theme:e})=>e.fontSize.sm};
  text-align: center;
`,fe=(0,g.Ay)(ge)`
  background-color: ${({theme:e})=>e.color.secondary[500]};
`,xe=(0,g.Ay)(ge)`
  background-color: ${({theme:e})=>e.color.primary[600]};
`,ye=g.Ay.p`
  overflow: hidden;

  max-width: 10rem;

  color: ${({theme:e})=>e.color.secondary[900]};
  text-overflow: ellipsis;
  white-space: nowrap;
`,be=g.Ay.p`
  overflow: hidden;

  max-width: 10rem;

  color: ${({theme:e})=>e.color.primary[900]};
  text-overflow: ellipsis;
  white-space: nowrap;
`,je=({driver:e,navigator:t})=>(0,n.jsx)(le,{"aria-label":`현재 드라이버는 ${e}, 내비게이터는 ${t} 입니다.`,children:(0,n.jsx)(V.q,{children:(0,n.jsxs)(ce,{children:[(0,n.jsxs)(me,{children:[(0,n.jsx)(pe,{"aria-hidden":"true",children:"💻"}),(0,n.jsxs)(ue,{children:[(0,n.jsx)(L,{direction:"top",message:"드라이버는 내비게이터가 설명한 방식대로 실제 코드를 작성하는 역할을 합니다.",children:(0,n.jsx)(fe,{children:"드라이버"})}),(0,n.jsx)(ye,{children:e})]})]}),(0,n.jsxs)(he,{children:[(0,n.jsxs)(ue,{children:[(0,n.jsx)(L,{direction:"top",message:"내비게이터는 코드의 논리적 흐름, 설계, 오류 등을 검토하며, 드라이버에게 피드백을 제공합니다.",children:(0,n.jsx)(xe,{children:"내비게이터"})}),(0,n.jsx)(be,{children:t})]}),(0,n.jsx)(pe,{"aria-hidden":"true",children:"🧭"})]})]})})});var $e=r(37),ve=r(7545),we=r(2947),Ae=r(1245),ke=r(3019);const Ce=()=>new ke.K({brokerURL:"undefined/ws"}),Se=(e,t,r)=>{e?.connected?e.subscribe(t,(e=>{const t=JSON.parse(e.body);r(t)})):console.error("웹소켓 연결에 실패했습니다.")},ze=(e,t,r)=>{e?.connected?e.publish({destination:t,body:JSON.stringify(r)}):console.error("[ERROR] 서버와 통신에 실패했습니다.")},Oe=(e,t,r,n)=>{ze(e,`/send/${t}/category/update/${r}/name`,{value:n})},Ee=(e,t,r)=>{ze(e,`/send/${t}/category/delete/${r}`)};var Re=r(3847),De=r(5340);const Ne=(e,t,r)=>e.length>10?{status:"ERROR",message:"10자 이하로 입력해 주세요"}:r===e?{status:"ERROR",message:"이전과 동일한 카테고리 이름입니다. 다른 이름을 입력해 주세요."}:t(e)||e===De.Jf?{status:"ERROR",message:"중복된 카테고리 입니다."}:{status:"DEFAULT",message:""},Ie=g.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  width: 100%;
`,Me=g.Ay.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;

  img {
    width: 2rem;
    height: 2rem;
  }
`,Te=g.Ay.div`
  display: flex;
  gap: 0.6rem;
`,Le=g.Ay.li`
  display: flex;
  align-items: center;

  width: 100%;
  height: 4.4rem;
  padding: 0 1.2rem;
  border: 1px solid ${({theme:e})=>e.color.black[200]};
  border-radius: 0.5rem;

  background-color: ${({theme:e,$isChecked:t})=>t?e.color.primary[800]:e.color.black[0]};
  color: ${({theme:e,$isChecked:t})=>t?e.color.black[0]:e.color.black[700]};
  font-size: ${({theme:e})=>e.fontSize.md};

  transition: all 0.2s ease-out;

  &:hover {
    background-color: ${({theme:e})=>e.color.primary[800]};
    color: ${({theme:e})=>e.color.black[0]};
  }
`,Fe=(g.AH`
  top: 4rem;

  font-size: 1rem;
`,({categoryId:e,categoryName:t,isChecked:r,closeModal:o,handleSelectCategory:s})=>{const{client:a,accessCode:c}=(0,Ae.A)(),{newCategoryName:d,handleCategoryName:h,isEditing:p,startEditing:g,stopEditing:f}=((e,t,r)=>{const{client:n}=(0,Ae.A)(),[o,s]=(0,i.useState)(!1),{value:a,handleChange:l,resetValue:c,message:d,status:m}=(0,Re.A)(r),{isCategoryExist:h}=(0,De.Ay)(e),p=()=>{c(),s(!1)};return{newCategoryName:{value:a,message:d,status:m},handleCategoryName:(e,t)=>{l(e,Ne(e.target.value,h,t))},isEditing:o,startEditing:()=>s(!0),stopEditing:p,updateCategoryName:async()=>{a!==r?(Oe(n,e,t,a),p()):p()},deleteCategoryName:async()=>{Ee(n,e,t)}}})(c,e,t),{addToast:x}=(0,m.A)();return p?(0,n.jsx)("form",{onSubmit:async t=>{t.preventDefault(),Oe(a,c,e,d.value)},children:(0,n.jsxs)(Ie,{children:[(0,n.jsx)(we.A,{height:"4.4rem",placeholder:"수정할 카테고리 이름을 입력해 주세요.",value:d.value,status:d.status,onChange:e=>h(e,t)}),(0,n.jsxs)(Te,{children:[(0,n.jsx)(W.A,{icon:(0,n.jsx)($e.H6t,{}),color:u.w.color.primary[800],type:"submit",size:"md"}),(0,n.jsx)(W.A,{icon:(0,n.jsx)($e.wwB,{}),color:u.w.color.primary[800],onClick:f,size:"md"})]})]})}):(0,n.jsxs)(Ie,{children:[(0,n.jsxs)(Me,{id:e,onClick:e=>{r||(s(e.currentTarget.id),x({status:"SUCCESS",message:`${t}가 선택되었어요.`}),o())},children:[(0,n.jsx)("img",{src:r?l.hk:l.GI,alt:r?"체크됨":"체크되지 않음"}),(0,n.jsx)(Le,{$isChecked:r,children:(0,n.jsx)("p",{children:t})})]}),e!==De.zb&&(0,n.jsxs)(Te,{children:[(0,n.jsx)(W.A,{onClick:g,icon:(0,n.jsx)($e.H6t,{}),color:u.w.color.primary[800],size:"md"}),(0,n.jsx)(W.A,{onClick:async()=>{Ee(a,c,e),r&&s(De.zb)},icon:(0,n.jsx)($e.Mst,{}),color:u.w.color.danger[500],size:"md"})]})]})}),Pe=g.Ay.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,He=g.Ay.ul`
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;

  width: 100%;
`,Ue=g.Ay.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
`,qe=({isOpen:e,closeModal:t,categories:r,isCategoryExist:i,selectedCategoryId:o,handleSelectedCategoryId:s})=>{const{value:a,handleChange:l,resetValue:m,message:h,status:p}=(0,Re.A)(""),{client:g,accessCode:f}=(0,Ae.A)(),x=()=>{m(),t()};return(0,n.jsxs)(d.a,{isOpen:e,close:x,size:"50rem",children:[(0,n.jsx)(d.a.Header,{children:(0,n.jsx)(Pe,{children:(0,n.jsx)("p",{children:"카테고리 선택하기"})})}),(0,n.jsx)(d.a.Body,{children:(0,n.jsx)(He,{children:r.map((e=>(0,n.jsx)(Fe,{isChecked:e.id===o,closeModal:x,categoryId:e.id,categoryName:e.value,handleSelectCategory:s},e.id)))})}),(0,n.jsx)(Ue,{onSubmit:e=>{e.preventDefault(),"ERROR"!==p&&(((e,t,r)=>{ze(e,`/send/${t}/category/post`,{value:r})})(g,f,a),m())},children:(0,n.jsxs)(ve.F,{gap:"0.5rem",children:[(0,n.jsxs)(ve.F.Content,{children:[(0,n.jsx)(ve.F.Input,{value:a,placeholder:"추가할 카테고리를 입력해 주세요.",height:"4.4rem",status:p,onChange:e=>l(e,Ne(e.target.value,i))}),(0,n.jsx)(c.A,{type:"submit",width:"4.8rem",height:"4.4rem",fontSize:u.w.fontSize.lg,rounded:!0,disabled:""===a.trim()||"DEFAULT"!==p,children:(0,n.jsx)($e._rf,{size:"1.6rem"})})]}),(0,n.jsx)(ve.F.Message,{status:p,children:h})]})}),(0,n.jsx)(d.a.CloseButton,{close:x})]})};var We=r(640),_e=r(8198);const Ve=g.Ay.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;
  min-height: 6rem;
  padding: 0 2rem;

  border-top: 1px solid ${({theme:e})=>e.color.black[100]};
`,Ge=g.Ay.form`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 80%;
`,Be=(g.Ay.div`
  display: flex;
  gap: 0.6rem;
`,({categories:e})=>{const[t,r]=(0,i.useState)(null),{client:o,accessCode:s}=(0,Ae.A)(),{value:a,status:l,handleChange:d,resetValue:m}=(0,Re.A)();return(0,n.jsxs)(Ve,{children:[(0,n.jsx)(We.m,{width:"17rem",height:"4rem",gap:"4.6rem",direction:"UPPER",placeholder:"카테고리를 선택해 주세요.",options:e,selectedOption:(0,_e.r)(e,t||"")||De.Jf,onSelect:e=>r(e)}),(0,n.jsxs)(Ge,{onSubmit:e=>{e.preventDefault();const r=(e=>{if(!e)return"";const t=e.trim();return t.startsWith("http://")||t.startsWith("https://")?t:`https://${t}`})(a),n=t===De.zb?null:t;((e,t,r,n)=>{ze(e,`/send/${t}/reference-link/post`,{url:r,categoryId:n})})(o,s,r,n),m()},children:[(0,n.jsx)(we.A,{height:"4rem",borderRadius:"0.6rem",placeholder:"링크를 입력해주세요.",value:a,status:l,onChange:d}),(0,n.jsx)(c.A,{width:"4.4rem",height:"4rem",borderRadius:"0.6rem",type:"submit","aria-label":"링크 추가하기 버튼",rounded:!0,disabled:""===a.trim()||"DEFAULT"!==l,children:(0,n.jsx)($e._rf,{size:"1.6rem",role:"presentation"})})]})]})});var Je=r(5238);const Ye=(0,g.Ay)(Je.AOl)`
  width: 2rem;
  height: 2rem;

  color: ${({$color:e})=>e};

  cursor: help;

  &:hover {
    transform: scale(1.1);
    transition: all 0.1s ease-out;
  }
`,Ze=({color:e=u.w.color.primary[900],boxColor:t=u.w.color.primary[900],boxDirection:r="bottom",...i})=>(0,n.jsx)(L,{direction:r,color:t,...i,children:(0,n.jsx)(Ye,{$color:e,role:"presentation"})}),Xe=g.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({theme:e})=>e.fontSize.lg};

  cursor: pointer;
`,Ke=g.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`,Qe=({isOpen:e,selectedCategoryName:t,toggleIsOpen:r,onButtonClick:i})=>(0,n.jsxs)(Xe,{"aria-label":e?"링크 카드 열림":"링크 카드 닫힘, 클릭하시면 링크 카드가 열립니다.",onClick:r,children:[(0,n.jsxs)(Ke,{children:[e?(0,n.jsx)(_.CJN,{size:u.w.fontSize.h6,color:u.w.color.primary[600],role:"presentation"}):(0,n.jsx)(_.Ik,{size:u.w.fontSize.h6,color:u.w.color.primary[600],role:"presentation"}),(0,n.jsx)("p",{children:"링크"}),(0,n.jsx)(Ze,{message:"페어 프로그래밍을 진행하면서 도움이 되었던 레퍼런스 링크를 저장해 보세요.",color:u.w.color.black[300],boxDirection:"right"})]}),(0,n.jsx)(c.A,{size:"sm",borderRadius:"3rem","aria-label":`현재 카테고리는 ${t} 입니다. 클릭하시면 카테고리 선택 모달이 열립니다.`,onClick:e=>{e.stopPropagation(),i(),r()},children:t})]});var et=r(9879);const tt=g.Ay.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: ${({$columns:e})=>e>2&&"center"};
  gap: 1rem;
  overflow-y: auto;

  padding: 3rem;
`,rt=g.Ay.div`
  flex-grow: 1;

  height: 0;
  padding: 2rem;

  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.md};
`,nt=g.Ay.ul`
  gap: 3rem 0;

  width: 100%;
  padding: 0;

  ${({$columns:e})=>e<=2?g.AH`
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
        `:g.AH`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
          place-items: center;
        `}

  li {
    list-style-type: none;
  }
`,it=g.Ay.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 17rem;
  height: 20rem;
  border: 1px solid ${({theme:e})=>e.color.black[100]};
  border-radius: 1.5rem;
`,ot=g.Ay.img`
  width: 100%;
  height: 10rem;

  object-fit: cover;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`,st=g.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 10rem;

  background-color: ${({theme:e})=>e.color.black[200]};
  color: ${({theme:e})=>e.color.black[300]};
  font-size: ${({theme:e})=>e.fontSize.sm};
  line-height: 1.3;

  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`,at=g.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow: hidden;

  width: 100%;
  height: 10rem;
  max-height: 12rem;
  padding: 1.5rem;

  cursor: pointer;
`,lt=g.Ay.p`
  overflow: hidden;

  width: 100%;

  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`,ct=g.Ay.p`
  display: -webkit-box;
  overflow: hidden;

  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.xs};
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`,dt=(0,g.Ay)(et.m6K)`
  position: absolute;
  top: 1rem;
  right: 1rem;

  width: 2rem;
  height: 2rem;
  padding: 0.3rem;
  border-radius: 100%;

  background-color: ${({theme:e})=>e.color.black[900]};
  opacity: 0.6;
  color: ${({theme:e})=>e.color.black[50]};

  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`,mt=({references:e})=>{const{client:t,accessCode:r}=(0,Ae.A)();if(!e||e.length<1)return(0,n.jsx)(rt,{children:"저장된 링크가 없습니다."});const i=e.length;return(0,n.jsx)(tt,{$columns:i,children:(0,n.jsx)(nt,{$columns:i,children:e.map((e=>(0,n.jsxs)(it,{children:[(0,n.jsx)(dt,{onClick:()=>{return n=e.id,void((e,t,r)=>{ze(e,`/send/${t}/reference-link/delete/${r}`)})(t,r,n);var n}}),(0,n.jsxs)(Q.N_,{to:e.url,target:"_blank",children:[e.image?(0,n.jsx)(ot,{alt:"link",src:e.image}):(0,n.jsxs)(st,{children:["이미지가",(0,n.jsx)("br",{}),"없습니다"]}),(0,n.jsxs)(at,{children:[(0,n.jsx)(lt,{children:e.openGraphTitle||e.headTitle}),(0,n.jsx)(ct,{children:e.description})]})]})]},e.id)))})})},ht=g.Ay.div`
  min-width: 49rem;
  max-height: calc(100vh - 23rem);
`,pt=g.Ay.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: ${({$isOpen:e})=>e?"calc(100vh - 25rem)":"0"};

  transition: height 0.3s;

  border-top: ${({$isOpen:e,theme:t})=>e&&`1px solid ${t.color.black[100]}`};
`,ut=(g.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 100%;
  min-height: 6rem;

  border-top: 1px solid ${({theme:e})=>e.color.black[100]};
`,({isOpen:e,toggleIsOpen:t,defaultReferences:r,defaultCategories:o})=>{const{accessCode:s}=(0,Ae.A)(),{references:a}=(e=>{const{client:t,isConnected:r,accessCode:n}=(0,Ae.A)(),[o,s]=(0,i.useState)(e),a=e=>s(e);return(0,i.useEffect)((()=>(t&&r&&Se(t,`/topic/${n}/reference-link`,a),()=>{t&&r&&t.unsubscribe(`/topic/${n}/reference-link`)})),[t]),{references:o}})(r),{categories:l}=(e=>{const{client:t,isConnected:r,accessCode:n}=(0,Ae.A)(),[o,s]=(0,i.useState)(e),a=e=>s(e);return(0,i.useEffect)((()=>(t&&r&&Se(t,`/topic/${n}/category`,a),()=>{t&&r&&t.unsubscribe(`/topic/${n}/category`)})),[t]),{categories:o}})(o),[c,d]=(0,i.useState)(De.zb),{isModalOpen:m,openModal:h,closeModal:p}=(0,ie.A)(),{isCategoryExist:u}=(0,De.Ay)(s),g=(0,_e.r)(l,c)||De.Jf;return(0,n.jsxs)(ht,{children:[(0,n.jsxs)(V.q,{children:[(0,n.jsx)(Qe,{isOpen:e,selectedCategoryName:g,toggleIsOpen:t,onButtonClick:h}),(0,n.jsxs)(pt,{$isOpen:e,children:[(0,n.jsx)(mt,{references:a||[]}),(0,n.jsx)(Be,{categories:l})]})]}),(0,n.jsx)(qe,{accessCode:s,isOpen:m,closeModal:p,categories:l,isCategoryExist:u,selectedCategoryId:c,handleSelectedCategoryId:e=>d(e)})]})});var gt=r(1066),ft=r(7097),xt=r(6142);const yt=async({duration:e,accessCode:t})=>{await xt.A.patch({url:`undefined/${t}/timer`,body:JSON.stringify({duration:60*Number(e)*1e3,remainingTime:60*Number(e)*1e3}),errorMessage:""})};var bt=r(5260);const jt=g.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`,$t=g.i7`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,vt=g.Ay.div`
  padding: 1.5rem 2rem;
  border: 1px solid ${({theme:e})=>e.color.black[100]};
  border-radius: 1rem;

  background: ${({theme:e})=>e.color.black[0]};

  animation: ${$t} 0.3s ease-out;
`,wt=g.Ay.p`
  margin-bottom: 0.5rem;

  color: ${({theme:e})=>e.color.black[500]};
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,At=g.Ay.form`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    font-size: ${({theme:e})=>e.fontSize.sm};
    font-weight: ${({theme:e})=>e.fontWeight.medium};
  }
`,kt=g.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,Ct=({isActive:e})=>{const t=(0,i.useRef)(null),{accessCode:r}=(0,o.g)(),{addToast:s}=(0,m.A)(),{isModalOpen:a,openModal:l,closeModal:d}=(0,ie.A)(),{value:h,handleChange:p,resetValue:g}=(0,Re.A)(),{updateTimerDurationMutation:f}=(()=>{const{addToast:e}=(0,m.A)(),{mutate:t,isPending:r}=(0,ft.n)({mutationFn:yt,onSuccess:()=>e({status:"SUCCESS",message:"타이머 시간이 성공적으로 변경되었습니다."}),onError:t=>e({status:"ERROR",message:t.message})});return{updateTimerDurationMutation:t,isPending:r}})();(0,gt.A)(t,(()=>d()));const x=""===h||!(0,bt.W)(h);return(0,n.jsxs)(jt,{children:[(0,n.jsx)(W.A,{icon:(0,n.jsx)(q.GD,{}),color:u.w.color.secondary[500],size:"md",onClick:()=>{e?s({status:"ERROR",message:"타이머 작동 중에는 타이머 시간을 변경할 수 없습니다."}):l()},"aria-label":"타이머 시간 수정 버튼"}),a&&(0,n.jsxs)(vt,{ref:t,children:[(0,n.jsx)(wt,{children:"타이머 시간 변경"}),(0,n.jsxs)(At,{onSubmit:e=>{e.preventDefault(),h&&r&&(f({duration:h,accessCode:r}),g(),d())},"aria-label":"타이머 시간을 분 단위로 입력해 주세요.",children:[(0,n.jsx)(we.A,{id:"timer",value:h,placeholder:"타이머 시간 (분)",onChange:p}),(0,n.jsxs)(kt,{children:[(0,n.jsx)(c.A,{type:"button",color:"secondary",size:"sm",filled:!1,rounded:!0,onClick:d,children:"닫기"}),(0,n.jsx)(c.A,{type:"submit",color:"secondary",size:"sm",rounded:!0,disabled:x,children:"완료"})]})]})]})]})},St=({minutes:e,seconds:t,progress:r,handleStart:n,handlePause:o,isActive:s})=>{const a=(0,i.useRef)(null),l=(0,i.useRef)(!1),c=i=>{const a=i.document.querySelector(".pipWindow");if(!a)return;i.document.querySelector(".layout")||(a.innerHTML='\n        <div class="layout">\n          <div class="container">\n            <div class="timer-container">\n              <span class="timer-text"></span>\n            </div>\n            <span class="timer-text">:</span>\n            <div class="timer-container">\n              <span class="timer-text"></span>\n            </div>\n          </div>\n          <div class="progress-bar">\n            <div class="progress-bar-fill"></div>\n          </div>\n          <div class="button-container">\n          </div>\n        </div>\n      ');const l=i.document.querySelector(".timer-container:first-child .timer-text"),c=i.document.querySelector(".timer-container:last-child .timer-text"),d=i.document.querySelector(".progress-bar-fill"),m=i.document.querySelector(".button-container");if(l&&(l.textContent=e),c&&(c.textContent=t),d&&d.setAttribute("style",`width: ${r}%`),m){m.innerHTML=s?'<button class="pause-button">\n          <svg width="20" height="20" viewBox="0 0 66 77" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M9.9 0C4.43438 0 0 4.29186 0 9.58182V67.0727C0 72.3627 4.43438 76.6546 9.9 76.6546H16.5C21.9656 76.6546 26.4 72.3627 26.4 67.0727V9.58182C26.4 4.29186 21.9656 0 16.5 0H9.9ZM49.5 0C44.0344 0 39.6 4.29186 39.6 9.58182V67.0727C39.6 72.3627 44.0344 76.6546 49.5 76.6546H56.1C61.5656 76.6546 66 72.3627 66 67.0727V9.58182C66 4.29186 61.5656 0 56.1 0H49.5Z" fill="#FFC453"/>\n          </svg>\n        </button>':'<button class="play-button">\n          <svg width="20" height="20" viewBox="0 0 85 84" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M16.1589 1.32C12.8828 -0.381977 8.76562 -0.438087 5.42318 1.15167C2.08073 2.74143 0 5.73391 0 8.98824V74.8229C0 78.0772 2.08073 81.0697 5.42318 82.6595C8.76562 84.2492 12.8828 84.1744 16.1589 82.4912L79.9089 49.5738C83.0742 47.9467 85 45.0477 85 41.9056C85 38.7635 83.0742 35.8832 79.9089 34.2373L16.1589 1.32Z" fill="#FFC453"/>\n          </svg>\n        </button>';const e=i.document.querySelector(".pause-button"),t=i.document.querySelector(".play-button");e&&e.addEventListener("click",o),t&&t.addEventListener("click",n)}},d=window.document.querySelector(".button");return d?.addEventListener("click",(()=>{s?n():o()})),(0,i.useEffect)((()=>{const e=()=>{document.hidden&&!l.current&&(async()=>{if(!a.current&&!l.current){l.current=!0;try{const e=await window.documentPictureInPicture.requestWindow({width:250,height:180});a.current=e;const t=e.document.createElement("style");t.textContent="\n        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');\n\n        body { \n          margin: 0;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          background: #F6F3F3;\n          height: 100%;\n          width: 100%;\n          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;\n        }\n        \n        .timer {\n          display: flex;\n          align-items: center;\n          gap: 8px;\n          font-size: 24px;\n          width: 100%;\n          height: 100%;\n        }\n        \n        .timer-container {\n          width:4rem;\n          display:flex;\n          justify-content: center;\n          align-items: center;\n        }\n        \n        .timer-text {\n          font-weight: regular;\n          font-size: 55px;\n        }\n\n        .layout {\n          display: flex;\n          align-items: center;\n          flex-direction: column;\n          width: 100%;\n          height: 11rem;\n          justify-content: center;\n          position:relative;\n        }\n\n        .container {\n          display: flex;\n          gap:0.3rem;\n        }\n\n      .progress-bar {\n        width: 100%;\n        height: 8px; \n        background: #e4e4e4;  \n        border-radius: 6px;\n        overflow: hidden;\n        margin: 8px 0;\n        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);  \n      }\n\n      .progress-bar-fill {\n        height: 100%;\n        background: linear-gradient(to right, #00E0C8, #00C2AD);  \n        border-radius: 4px;\n        transition: width 0.3s ease-out;\n        box-shadow: 0 0 8px rgba(0, 224, 200, 0.5);\n      }\n\n        button{\n          background-color: #F7EAD3;\n          border-radius: 0.5rem;\n          border: none;\n          width: 2.3rem;\n          height: 2.1rem;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          cursor:pointer;\n        }\n      .button-container{\n        display: flex;\n        align-items: center;\n        justify-content:center;\n        gap: 4px;\n        margin-top:1rem;\n      }\n\n      button:hover{\n        opacity: 1.2;\n        background-color: #f3e2c6;\n        transition: all 0.2s;\n      }\n\n      ",e.document.head.appendChild(t);const r=e.document.createElement("div");r.className="pipWindow",e.document.body.appendChild(r),e.addEventListener("unload",(()=>{a.current=null,l.current=!1})),c(e)}catch(e){console.error("PiP 윈도우 생성 실패:",e),l.current=!1}}})()};return document.addEventListener("visibilitychange",e),()=>{document.removeEventListener("visibilitychange",e)}}),[]),(0,i.useEffect)((()=>{a.current&&c(a.current)}),[e,t,r,s]),null};var zt;!function(e){e.COMPLETE="complete",e.START="start",e.RUNNING="running",e.PAUSE="pause",e.UPDATE="update"}(zt||(zt={}));const Ot=(e,t,r)=>{const n=(0,o.Zp)(),s=(0,i.useRef)(e),{client:a,isConnected:c,accessCode:d}=(0,Ae.A)(),{addToast:h}=(0,m.A)(),[p,u]=(0,i.useState)(t),[g,f]=(0,i.useState)(!1),x=(0,i.useRef)(new Audio(l.bB)),{fireNotification:y}=(()=>{const e=(0,i.useRef)(null),t=t=>{t.preventDefault(),window.focus(),e.current?.close()};return(0,i.useEffect)((()=>{(async()=>{"granted"!==Notification.permission&&await Notification.requestPermission()})()}),[]),{fireNotification:(r,n,i)=>{if("granted"!==Notification.permission||document.hasFocus())console.warn("알림 권한이 허용되지 않았습니다.");else{const o={body:n||" ",badge:l.f,icon:l.f,...i},s=new Notification(r,o);e.current=s,s.onclick=t}}}})();return(0,i.useEffect)((()=>{const e=()=>{a&&c&&(a.unsubscribe(`/topic/${d}/timer`),a.unsubscribe(`/topic/${d}/timer/status`))},t=()=>{e()};return window.addEventListener("beforeunload",t),a&&c&&(Se(a,`/topic/${d}/timer`,(e=>(e=>{if(0===e)return f(!1),u(s.current),r(),x.current.play(),y("타이머가 끝났어요!","드라이버 / 내비게이터 역할을 바꿔 주세요!",{requireInteraction:!0}),h({status:"SUCCESS",message:"타이머가 종료되었습니다."}),void h({status:"INFO",message:"드라이버 / 내비게이터 역할을 바꿔 주세요!"});u(e)})(e.data))),Se(a,`/topic/${d}/timer/status`,(e=>((e,t)=>{switch(e){case zt.COMPLETE:n(`/room/${d}/retrospectForm`,{state:{valid:!0}}),h({status:"WARNING",message:"페어룸이 종료되었습니다."});break;case zt.START:f(!0),h({status:"SUCCESS",message:"타이머가 시작되었습니다."});break;case zt.RUNNING:f(!0),h({status:"WARNING",message:"타이머가 진행 중입니다."});break;case zt.PAUSE:f(!1),h({status:"WARNING",message:"타이머가 일시 정지되었습니다."});break;case zt.UPDATE:t&&(s.current=t,u(t),h({status:"WARNING",message:"타이머 시간이 변경되었습니다."}));break;default:h({status:"ERROR",message:"예상하지 못한 에러가 발생했습니다."})}})(e.status,e.data)))),()=>{window.removeEventListener("beforeunload",t),e()}}),[a]),{duration:s.current,timeLeft:p,isActive:g,handleStart:()=>{g||(async e=>{await xt.A.patch({url:`undefined/${e}/timer/start`,errorMessage:""})})(d)},handlePause:()=>{g&&(async e=>{await xt.A.patch({url:`undefined/${e}/timer/stop`,errorMessage:""})})(d)}}};var Et=r(2657);const Rt=e=>e<10?`0${e}`:`${e}`,Dt=e=>e<10?`0${e}`:`${e}`,Nt=g.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  min-width: 60rem;
  height: 100%;
  padding: 2rem;
`,It=g.Ay.div.attrs((({theme:e,$progress:t})=>({style:{backgroundImage:`linear-gradient(white, white), \n      conic-gradient(${e.color.primary[600]} ${t}%, ${e.color.black[300]} ${t}%)`}})))`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 45vh;
  min-width: 28rem;
  height: 45vh;
  min-height: 28rem;
  border: 0.8rem solid transparent;
  border-radius: 50%;

  transition: background-image 1s ease-in;

  aspect-ratio: 1;
  background-clip: content-box, border-box;
  background-origin: border-box;
`,Mt=g.Ay.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`,Tt=g.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  width: 10rem;

  font-size: ${({theme:e})=>e.fontSize.sm};
`,Lt=g.Ay.p`
  font-size: 7rem;
`,Ft=g.Ay.div`
  display: flex;
  gap: 5rem;
`,Pt=({defaultTime:e,defaultTimeLeft:t,onTimerStop:r})=>{const{duration:o,timeLeft:s,isActive:l,handleStart:c,handlePause:d}=Ot(e,t,r);(0,i.useRef)(s).current=s;const{minutes:m,seconds:h}=(e=>{const t=Math.floor(e/6e4),r=Math.floor(e%6e4/1e3);return{minutes:Rt(t),seconds:Dt(r)}})(s);return(0,Et.A)(m,h),(0,n.jsx)(V.q,{children:(0,n.jsxs)(Nt,{"aria-label":"타이머",children:[(0,n.jsx)(St,{isActive:l,minutes:m,seconds:h,progress:s/o*100,handleStart:c,handlePause:d}),(0,n.jsx)(It,{$progress:s/o*100,role:"timer","aria-label":`현재 남은 시간은 ${m}분 ${h}초 입니다.`,children:(0,n.jsxs)(Mt,{"aria-label":`${m}분 ${h}초`,children:[(0,n.jsxs)(Tt,{"aria-hidden":"true",children:[(0,n.jsx)(Lt,{children:m}),"분(m)"]}),(0,n.jsx)(Lt,{"aria-hidden":"true",children:":"}),(0,n.jsxs)(Tt,{"aria-hidden":"true",children:[(0,n.jsx)(Lt,{children:h}),"초(s)"]})]})}),(0,n.jsxs)(Ft,{children:[(0,n.jsx)(W.A,{icon:(0,n.jsx)(a.gSK,{role:"presentation"}),size:"lg",color:u.w.color.secondary[500],disabled:l,onClick:c,"aria-label":"타이머 시작하기"}),(0,n.jsx)(W.A,{icon:(0,n.jsx)(a.kwt,{role:"presentation"}),size:"lg",color:u.w.color.secondary[500],disabled:!l,onClick:d,"aria-label":"타이머 중지하기"})]}),(0,n.jsx)(Ct,{isActive:l})]})})},Ht=g.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({theme:e})=>e.fontSize.lg};

  cursor: pointer;
`,Ut=({isOpen:e,toggleIsOpen:t})=>(0,n.jsxs)(Ht,{"aria-label":e?"투두 리스트 카드 열림":"투두 리스트 카드 닫힘, 클릭하시면 투두 리스트 카드가 열립니다.",onClick:t,children:[e?(0,n.jsx)(_.tF0,{size:u.w.fontSize.h6,color:u.w.color.primary[600],role:"presentation"}):(0,n.jsx)(_.pte,{size:u.w.fontSize.h6,color:u.w.color.primary[600],role:"presentation"}),(0,n.jsx)("p",{children:"투두 리스트"}),(0,n.jsx)(Ze,{message:"페어 프로그래밍을 위해 필요한 할 일 목록을 작성해 보세요. 할 일을 더욱 효율적으로 관리할 수 있습니다.",color:u.w.color.black[300],boxDirection:"right"})]}),qt=g.Ay.div`
  display: flex;

  cursor: pointer;
`,Wt=g.Ay.input`
  display: none;
`,_t=g.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;
  border: 1px solid ${({$isChecked:e,theme:t})=>e?t.color.black[400]:t.color.secondary[400]};
  border-radius: 4px;

  background-color: ${({$isChecked:e,theme:t})=>e?t.color.black[300]:t.color.secondary[200]};

  transition: all 0.1s ease 0s;

  &:hover {
    background-color: ${({theme:e,$isChecked:t})=>t?e.color.black[400]:e.color.secondary[300]};
  }
`,Vt=({isChecked:e,onClick:t})=>(0,n.jsxs)(qt,{onClick:t,children:[(0,n.jsx)(Wt,{type:"checkbox",checked:e,readOnly:!0}),(0,n.jsx)(_t,{$isChecked:e,children:e&&(0,n.jsx)(et.g9_,{size:"1.8rem",color:u.w.color.black[0]})})]}),Gt=g.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;

  padding: 1.6rem;
  border-radius: 1rem;

  background: ${({$isChecked:e,$isDraggedOver:t,theme:r})=>e?t?r.color.black[200]:r.color.black[100]:t?r.color.secondary[100]:r.color.secondary[50]};
  font-size: ${({theme:e})=>e.fontSize.md};

  transition: background 0.1s ease;

  cursor: pointer;

  &:hover {
    background: ${({$isChecked:e,$isIconHovered:t,theme:r})=>!t&&(e?r.color.black[200]:r.color.secondary[100])};
  }
`,Bt=g.Ay.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  p {
    text-decoration: ${({$isChecked:e})=>e&&"line-through"};
    word-break: break-all;

    transition: text-decoration 0.1s ease;
  }
`,Jt=g.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`,Yt=(0,g.Ay)(Je.$6X)`
  width: 1.7rem;
  height: 1.7rem;

  color: ${({$isChecked:e,theme:t})=>e?t.color.black[300]:t.color.secondary[400]};

  transition: color 0.1s ease;

  &:hover {
    color: ${({$isChecked:e,theme:t})=>e?t.color.black[400]:t.color.secondary[500]};
  }
`,Zt=(0,g.Ay)(Je.F23)`
  width: ${({theme:e})=>e.fontSize.lg};
  height: ${({theme:e})=>e.fontSize.lg};

  color: ${({$isChecked:e,theme:t})=>e?t.color.black[300]:t.color.secondary[400]};

  transition: color 0.1s ease;

  &:hover {
    color: ${({$isChecked:e,theme:t})=>e?t.color.black[400]:t.color.secondary[400]};
  }
`,Xt=({todo:e,isDraggedOver:t,onDragStart:r,onDragEnter:o,onDrop:s})=>{const[a,l]=(0,i.useState)(!1),[,c]=(0,p.A)(),{client:d,accessCode:m}=(0,Ae.A)(),{id:h,isChecked:u,content:g}=e;return(0,n.jsxs)(Gt,{$isChecked:u,$isIconHovered:a,$isDraggedOver:t,draggable:!0,onDragStart:()=>r(h),onDragEnter:()=>o(h),onDragOver:e=>e.preventDefault(),onDragEnd:s,children:[(0,n.jsxs)(Bt,{$isChecked:u,children:[(0,n.jsx)(Vt,{isChecked:u,onClick:()=>((e,t,r)=>{ze(e,`/send/${t}/todo/update/${r}/checked`)})(d,m,h)}),(0,n.jsx)("p",{children:g})]}),(0,n.jsxs)(Jt,{children:[(0,n.jsx)(Yt,{$isChecked:u,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onClick:()=>c(g)}),(0,n.jsx)(Zt,{$isChecked:u,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onClick:()=>((e,t,r)=>{ze(e,`/send/${t}/todo/delete/${r}`)})(d,m,h)})]})]})},Kt=g.Ay.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;

  padding: 2rem;
`,Qt=g.Ay.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`,er=g.Ay.p`
  color: ${({theme:e})=>e.color.black[300]};
  font-size: ${({theme:e})=>e.fontSize.sm};
`,tr=g.Ay.p`
  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.md};
`,rr=({todos:e})=>{const{client:t,accessCode:r}=(0,Ae.A)(),{dragOverItem:o,handleDragStart:s,handleDragEnter:a,handleDrop:l}=((e,t)=>{const[r,n]=(0,i.useState)(null),[o,s]=(0,i.useState)(null);return{dragItem:r,dragOverItem:o,handleDragStart:t=>n(e.find((e=>e.id===t))||null),handleDragEnter:t=>s(e.find((e=>e.id===t))||null),handleDrop:e=>{e.preventDefault(),r&&o&&r.id!==o.id&&(t(r.id,o.order),n(null),s(null))}}})(e,((e,n)=>{((e,t,r,n)=>{ze(e,`/send/${t}/todo/update/${r}/order`,{order:n})})(t,r,e,n)}));return(0,n.jsx)(Kt,{children:e.length>0?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(er,{children:["총 ",e.length,"개"]}),(0,n.jsx)(Qt,{children:e.map((e=>(0,n.jsx)(Xt,{todo:e,isDraggedOver:o?.id===e.id,onDragStart:s,onDragEnter:a,onDrop:l},e.id)))})]}):(0,n.jsx)(tr,{children:"저장된 투두 리스트가 없습니다."})})},nr=g.AH`
  height: 4rem;
  border-radius: 0.6rem;
`,ir=g.Ay.div`
  min-width: 49rem;
`,or=g.Ay.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: ${({$isOpen:e})=>e?"calc(100vh - 25rem)":"0"};

  transition: height 0.3s;

  border-top: ${({$isOpen:e,theme:t})=>e&&`1px solid ${t.color.black[100]}`};
`,sr=g.Ay.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 6rem;
  min-height: 6rem;
  border-radius: 0 0 1.5rem 1.5rem;

  background-color: ${({theme:e})=>e.color.black[0]};
  border-top: 1px solid ${({theme:e})=>e.color.black[100]};
`,ar=g.Ay.form`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 100%;
  padding: 0 2rem;
`,lr=({isOpen:e,toggleIsOpen:t,defaultTodos:r})=>{const{todos:o}=(e=>{const{client:t,isConnected:r,accessCode:n}=(0,Ae.A)(),[o,s]=(0,i.useState)(e),a=e=>s(e);return(0,i.useEffect)((()=>(t&&r&&Se(t,`/topic/${n}/todo`,a),()=>{t&&r&&t.unsubscribe(`/topic/${n}/todo`)})),[t]),{todos:o}})(r),{value:s,handleChange:a,resetValue:l}=(0,Re.A)(),{client:d,accessCode:m}=(0,Ae.A)();return(0,n.jsx)(ir,{children:(0,n.jsxs)(V.q,{children:[(0,n.jsx)(Ut,{isOpen:e,toggleIsOpen:t}),(0,n.jsxs)(or,{$isOpen:e,children:[(0,n.jsx)(rr,{todos:o}),(0,n.jsx)(sr,{children:(0,n.jsxs)(ar,{onSubmit:e=>{e.preventDefault(),((e,t,r)=>{ze(e,`/send/${t}/todo/post`,{contents:r})})(d,m,s),l()},children:[(0,n.jsx)(we.A,{height:"4rem",borderRadius:"0.6rem",$css:nr,value:s,onChange:a,maxLength:100,placeholder:"할 일의 내용을 입력해 주세요."}),(0,n.jsx)(c.A,{width:"4.4rem",height:"4rem",borderRadius:"0.6rem",type:"submit","aria-label":"투두 리스트 추가하기",rounded:!0,disabled:""===s.trim(),children:(0,n.jsx)($e._rf,{size:"1.6rem",role:"presentation"})})]})})]})]})})};var cr=r(3795);const dr=g.Ay.div`
  display: flex;
  gap: 2rem;

  min-width: fit-content;
  height: calc(100vh - 7rem);
  min-height: 60rem;
  padding: 2rem;

  background: ${({theme:e})=>e.color.primary[50]};
`,mr=(g.Ay.div`
  display: flex;
  gap: 2rem;

  min-width: fit-content;
  height: calc(100vh - 7rem);
  min-height: 60rem;
  padding: 2rem;

  background: ${({theme:e})=>e.color.primary[50]};
`,g.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  min-height: 56rem;
  max-height: calc(100vh - 11rem);
`),hr=()=>{const e=(0,o.Zp)(),{accessCode:t}=(0,o.g)();(()=>{const{setClient:e,setIsConnected:t}=(0,Ae.A)(),{addToast:r}=(0,m.A)(),n=e=>{e.preventDefault()};(0,i.useEffect)((()=>{const i=Ce();return i.onConnect=()=>{e(i),t(!0)},i.onDisconnect=()=>{e(null),t(!1)},i.onStompError=e=>{console.error(e),r({status:"ERROR",message:`웹소켓 연결 과정에서 오류가 발생했습니다. ${e}`})},i.activate(),window.addEventListener("beforeunload",n),()=>{i.deactivate(),e(null),t(!1),window.removeEventListener("beforeunload",n)}}),[])})();const{isConnected:r}=(0,Ae.A)(),[a,l]=(0,i.useState)(""),[c,d]=(0,i.useState)(""),[h,p]=(0,i.useState)(!1),{driver:u,navigator:g,status:f,missionUrl:x,duration:y,remainingTime:b,isFetching:j,todos:$,references:v,categories:A}=(0,cr.A)(t||""),{updatePairRoleMutation:k}=(0,oe.A)(),{isModalOpen:C,closeModal:S}=(0,ie.A)(!0);return(0,i.useEffect)((()=>{"COMPLETED"===f&&e(`/room/${t}/completed`,{state:{valid:!0},replace:!0})}),[f]),(0,i.useEffect)((()=>{l(u),d(g)}),[u,g]),j||!r?(0,n.jsx)(s.A,{}):(0,n.jsxs)(dr,{children:[(0,n.jsx)(ae,{driver:a,navigator:c,missionUrl:x,accessCode:t||""}),(0,n.jsxs)(mr,{children:[(0,n.jsx)(je,{driver:a,navigator:c}),(0,n.jsx)(Pt,{defaultTime:y,defaultTimeLeft:b,onTimerStop:()=>k({accessCode:t||""})})]}),(0,n.jsxs)(mr,{children:[(0,n.jsx)(lr,{isOpen:!h,toggleIsOpen:()=>p(!1),defaultTodos:$}),(0,n.jsx)(ut,{isOpen:h,toggleIsOpen:()=>p(!0),defaultReferences:v,defaultCategories:A})]}),(0,n.jsx)(w,{isOpen:C,close:S,accessCode:t||""})]})}}}]);
//# sourceMappingURL=272.js.map