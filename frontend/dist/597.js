!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},r=(new Error).stack;r&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[r]="db72be73-af90-4bff-b911-3293c73b38b5",e._sentryDebugIdIdentifier="sentry-dbid-db72be73-af90-4bff-b911-3293c73b38b5")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"550fb57d92c04837d719efcb8092f107163acda9"},(self.webpackChunkcoduo_frontend=self.webpackChunkcoduo_frontend||[]).push([[597],{1597:(e,r,t)=>{t.r(r),t.d(r,{default:()=>mt});var o=t(4848),i=t(6540),s=t(7767),n=t(7418),a=t(9197),l=t(6638),d=t(563),c=t(7351),m=t(1711),h=t(656),g=t(4998),p=t(7594),u=t(7581);const f=u.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  padding: 1rem 0;
`,x=u.Ay.h1`
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,y=u.Ay.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,b=u.Ay.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,j=u.Ay.p`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-size: ${({theme:e})=>e.fontSize.base};
`,$=u.Ay.div`
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
`,v=u.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  p {
    color: ${({theme:e})=>e.color.black[300]};
    font-size: ${({theme:e})=>e.fontSize.sm};
  }
`,w=({isOpen:e,close:r,accessCode:t})=>{const s=(0,i.useRef)(new Audio(l.bB)),{addToast:n}=(0,m.A)(),[,u]=(0,g.A)(),{buttonRef:w}=(0,h.A)(e);return(0,o.jsxs)(c.a,{isOpen:e,close:r,size:"70rem",children:[(0,o.jsx)(c.a.CloseButton,{close:r}),(0,o.jsxs)(f,{children:[(0,o.jsx)(x,{children:"페어 프로그래밍을 시작하기 전에..."}),(0,o.jsxs)(y,{"aria-label":"페어 프로그래밍을 시작하기 전에 아래의 항목들을 체크해 주세요.",children:[(0,o.jsxs)(b,{children:[(0,o.jsxs)(j,{children:[(0,o.jsx)(a.CMH,{role:"presentation"}),"브라우저 알림을 허용하셨나요?"]}),(0,o.jsxs)($,{children:["브라우저 알림을 허용하지 않으면 타이머 종료 시 올바르게 알림을 제공할 수 없어요.",(0,o.jsx)(d.A,{width:"9rem",height:"3.2rem",color:"danger",borderRadius:"0.8rem",fontSize:p.w.fontSize.md,onClick:()=>{"granted"===Notification.permission?n({status:"SUCCESS",message:"알림 권한이 허용된 상태입니다."}):n({status:"ERROR",message:"알림 권한이 허용되지 않았습니다. 설정에서 권한을 허용해 주세요."})},children:"권한 확인"})]})]}),(0,o.jsxs)(b,{children:[(0,o.jsxs)(j,{children:[(0,o.jsx)(a.CMH,{role:"presentation"}),"사용 중인 기기의 소리가 켜져 있나요?"]}),(0,o.jsxs)($,{children:["사용 중인 기기의 소리가 꺼져 있다면 타이머 종료 시 알람 소리를 들으실 수 없어요.",(0,o.jsx)(d.A,{width:"9rem",height:"3.2rem",color:"danger",borderRadius:"0.8rem",fontSize:p.w.fontSize.md,onClick:()=>s.current.play(),children:"소리 확인"})]})]}),(0,o.jsxs)(b,{children:[(0,o.jsxs)(j,{children:[(0,o.jsx)(a.CMH,{role:"presentation"}),"페어룸 코드를 복사하셨나요?"]}),(0,o.jsxs)($,{children:["페어에게 페어룸 코드를 전달하여 페어룸에 들어올 수 있도록 해주세요.",(0,o.jsx)(d.A,{width:"9rem",height:"3.2rem",color:"danger",borderRadius:"0.8rem",fontSize:p.w.fontSize.md,onClick:()=>u(t),children:"코드 복사"})]})]})]}),(0,o.jsx)(c.a.Footer,{position:"CENTER",children:(0,o.jsxs)(v,{children:[(0,o.jsx)("p",{children:"모두 확인하셨나요?"}),(0,o.jsx)(d.A,{ref:w,width:"18rem",size:"lg",onClick:r,children:"시작하기"})]})})]})]})};var A=t(57);const k=u.Ay.div`
  display: flex;
  justify-content: ${({$isOpen:e})=>e?"space-between":"center"};
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  background-color: ${({theme:e})=>e.color.black[100]};

  transition: background-color 0.3s ease-out;

  cursor: pointer;
`,C=u.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
`,S=u.Ay.span`
  height: 2rem;

  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
`,E=u.Ay.span`
  font-size: ${({theme:e})=>e.fontSize.md};
`,O=({isOpen:e,accessCode:r})=>{const[,t]=(0,g.A)();return(0,o.jsxs)(k,{role:"button",$isOpen:e,onClick:()=>{t(r)},"aria-label":`페어룸 코드는 ${r}입니다. 클릭하시면 페어룸 코드가 클립보드에 복사됩니다.`,children:[e&&(0,o.jsxs)(C,{children:[(0,o.jsx)(S,{children:"방 코드"}),(0,o.jsx)(E,{children:r})]}),(0,o.jsx)(a.bTl,{size:"1.5rem",role:"presentation"})]})};var z=t(658),R=t(4703),M=t(1983);const T=u.i7`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
`,I=u.Ay.div`
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
`,D=u.AH`
  content: '';

  position: absolute;
  border-width: 0.8rem;
  border-style: solid;
  filter: drop-shadow(0 0.2rem 0.2rem rgb(0 0 0 / 30%));
`,N=u.Ay.div`
  display: none;

  position: absolute;
  z-index: ${M.M.TOOLTIP};

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

  animation: ${T} 0.3s ease-in-out forwards;

  cursor: help;

  ${({$color:e,$direction:r})=>((e,r)=>{switch(e){case"top":return u.AH`
        bottom: 3.5rem;
        left: 50%;

        transform: translateX(-50%);

        &::before {
          ${D}
          top: 100%;
          left: 50%;

          border-color: ${r} transparent transparent transparent;

          transform: translateX(-50%);
        }
      `;case"bottom":return u.AH`
        top: 3.5rem;
        left: 50%;

        transform: translateX(-50%);

        &::before {
          ${D}
          bottom: 100%;
          left: 50%;

          border-color: transparent transparent ${r} transparent;

          transform: translateX(-50%);
        }
      `;case"left":return u.AH`
        top: 50%;
        right: 3.5rem;

        transform: translateY(-50%);

        &::before {
          ${D}
          top: 50%;
          left: 100%;

          border-color: transparent transparent transparent ${r};

          transform: translateY(-50%);
        }
      `;case"right":return u.AH`
        top: 50%;
        left: 3.5rem;

        transform: translateY(-50%);

        &::before {
          ${D}
          top: 50%;
          right: 100%;

          border-color: transparent ${r} transparent transparent;

          transform: translateY(-50%);
        }
      `}})(r,e)};
`,F=({message:e,direction:r="bottom",color:t=p.w.color.primary[900],children:i})=>(0,o.jsxs)(I,{role:"tooltip","aria-label":e,children:[i,(0,o.jsx)(N,{className:"tooltip",$color:t,$direction:r,children:e})]}),_=u.Ay.button`
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

  background-color: ${({theme:e,disabled:r})=>r?e.color.black[100]:e.color.danger[100]};
  color: ${({theme:e,disabled:r})=>r?e.color.black[400]:e.color.danger[500]};
  font-size: ${({theme:e})=>e.fontSize.base};
  text-overflow: ellipsis;
  white-space: nowrap;

  cursor: ${({disabled:e})=>e?"not-allowed":"pointer"};
`,G=(0,u.Ay)(F)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`,U=u.Ay.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`,q=({isOpen:e,openModal:r})=>{const{userStatus:t}=(0,R.A)(),i="SIGNED_IN"!==t;return(0,o.jsx)(_,{onClick:r,disabled:i,"aria-label":i?"로그인 후 페어룸을 종료할 수 있습니다. ":"클릭하시면 페어룸이 종료됩니다.",children:i?(0,o.jsx)(G,{message:"로그인 후 페어룸을 종료할 수 있습니다.",direction:"top",children:(0,o.jsxs)(U,{children:[(0,o.jsx)(z.Flv,{size:"1.5rem"}),e&&(0,o.jsx)("span",{children:"페어룸 종료하기"})]})}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(z.Flv,{size:"1.5rem"}),e&&(0,o.jsx)("span",{children:"페어룸 종료하기"})]})})};var H=t(1351),W=t(6872),L=t(6512),K=t(5617);const P=(0,u.Ay)(K.q.Header)`
  justify-content: ${({$isOpen:e})=>e?"space-between":"center"};

  padding: ${({$isOpen:e})=>e?"2rem 1rem 2rem 2rem":"0"};
`,Q=(0,u.Ay)(L.m6W)`
  transform: rotate(${({$isOpen:e})=>e?0:180}deg);
  transition: transform 0.2s ease-in-out;
`,V=({isOpen:e,toggleOpen:r})=>(0,o.jsx)(P,{icon:e&&(0,o.jsx)(H.GvN,{color:p.w.color.primary[600],role:"presentation"}),title:e?"페어":"",$isOpen:e,children:(0,o.jsx)(W.A,{icon:(0,o.jsx)(Q,{$isOpen:e}),size:"md",onClick:r,"aria-label":e?"목록 접기":"목록 열기"})}),Y=u.Ay.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;

  height: 6rem;
  padding: 0 1.6rem;

  border-bottom: 1px solid ${({theme:e})=>e.color.black[100]};
`,B=u.Ay.span`
  width: 7rem;
  padding: 0.4rem 0.8rem;
  border-radius: 1.2rem;

  background-color: ${({theme:e,$role:r})=>"DRIVER"===r?e.color.primary[600]:e.color.secondary[500]};
  color: white;
  font-size: ${({theme:e})=>e.fontSize.sm};
  text-align: center;
`,X=u.Ay.span`
  overflow: hidden;

  font-size: ${({theme:e})=>e.fontSize.base};
  text-overflow: ellipsis;
  white-space: nowrap;
`,Z=({isOpen:e,driver:r,navigator:t})=>(0,o.jsxs)("div",{children:[(0,o.jsxs)(Y,{"aria-label":`현재 드라이버는 ${r}입니다.`,children:[e&&(0,o.jsx)(B,{$role:"DRIVER",children:"드라이버"}),(0,o.jsx)(X,{children:r})]}),(0,o.jsxs)(Y,{"aria-label":`현재 내비게이터는 ${t}입니다.`,children:[e&&(0,o.jsx)(B,{$role:"NAVIGATOR",children:"내비게이터"}),(0,o.jsx)(X,{children:t})]})]});var J=t(4976);const ee=u.Ay.div`
  display: flex;
  justify-content: ${({$isOpen:e})=>e?"space-between":"center"};
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  background-color: ${({theme:e})=>e.color.black[800]};

  transition: background-color 0.3s ease-out;

  cursor: pointer;
`,re=u.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
`,te=u.Ay.span`
  color: ${({theme:e})=>e.color.black[0]};
  font-size: ${({theme:e})=>e.fontSize.md};
`,oe=({isOpen:e,missionUrl:r})=>(0,o.jsx)(J.N_,{to:r,target:"_blank","aria-label":"클릭하시면 미션 리포지토리로 이동합니다.",children:(0,o.jsxs)(ee,{$isOpen:e,children:[(0,o.jsx)("img",{src:l.qZ,alt:""}),e&&(0,o.jsxs)(re,{children:[(0,o.jsx)(te,{children:"미션 리포지토리로 이동"}),(0,o.jsx)(L.OQo,{size:"1.6rem",color:"white",role:"presentation"})]})]})});var ie=t(2298),se=t(4700);const ne=u.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  min-width: ${e=>e.$isOpen?"24rem":"6rem"};

  white-space: nowrap;

  transition: min-width 0.3s;
`,ae=({driver:e,navigator:r,missionUrl:t,accessCode:n})=>{const a=(0,s.Zp)(),[l,d]=(0,i.useState)(!0),{isModalOpen:c,openModal:m,closeModal:h}=(0,ie.A)(),{updatePairRoomStatusMutation:g}=(0,se.A)();return(0,o.jsxs)(ne,{$isOpen:l,"aria-label":"페어 목록",children:[(0,o.jsxs)(K.q,{children:[(0,o.jsx)(V,{isOpen:l,toggleOpen:()=>d(!l)}),(0,o.jsx)(O,{isOpen:l,accessCode:n}),""!==t&&(0,o.jsx)(oe,{isOpen:l,missionUrl:t}),(0,o.jsx)(Z,{isOpen:l,driver:e,navigator:r}),(0,o.jsx)(q,{isOpen:l,openModal:m})]}),(0,o.jsx)(A.A,{isOpen:c,close:h,type:"SUCCESS",title:"정말 종료하시겠습니까?",subTitle:"페어룸을 종료해도 기록은 다시 확인할 수 있어요.",confirmText:"종료하기",onConfirm:()=>{g({accessCode:n},{onSuccess:()=>a(`/room/${n}/retrospectForm`,{state:{valid:!0}})})}})]})},le=u.Ay.div`
  display: flex;

  min-width: 60rem;
  min-height: 14rem;
`,de=u.Ay.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;

  height: 100%;
  padding: 2rem;
`,ce=u.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  width: 18rem;
  height: 9.4rem;
  padding: 1.6rem 2.4rem;
  border-radius: 2rem;
`,me=(0,u.Ay)(ce)`
  background: linear-gradient(
    180deg,
    ${({theme:e})=>e.color.secondary[50]},
    ${({theme:e})=>e.color.secondary[200]}
  );
`,he=(0,u.Ay)(ce)`
  background: linear-gradient(
    180deg,
    ${({theme:e})=>e.color.black[50]},
    ${({theme:e})=>e.color.black[300]}
  );
`,ge=u.Ay.p`
  font-size: ${({theme:e})=>e.fontSize.h2};
`,pe=u.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;

  p {
    font-size: ${({theme:e})=>e.fontSize.h4};
    font-weight: ${({theme:e})=>e.fontWeight.medium};
  }
`,ue=u.Ay.div`
  width: 8rem;
  padding: 0.4rem 0;
  border-radius: 10rem;

  color: ${({theme:e})=>e.color.black[0]};
  font-size: ${({theme:e})=>e.fontSize.sm};
  text-align: center;
`,fe=(0,u.Ay)(ue)`
  background-color: ${({theme:e})=>e.color.secondary[500]};
`,xe=(0,u.Ay)(ue)`
  background-color: ${({theme:e})=>e.color.primary[600]};
`,ye=u.Ay.p`
  overflow: hidden;

  max-width: 10rem;

  color: ${({theme:e})=>e.color.secondary[900]};
  text-overflow: ellipsis;
  white-space: nowrap;
`,be=u.Ay.p`
  overflow: hidden;

  max-width: 10rem;

  color: ${({theme:e})=>e.color.primary[900]};
  text-overflow: ellipsis;
  white-space: nowrap;
`,je=({driver:e,navigator:r})=>(0,o.jsx)(le,{"aria-label":`현재 드라이버는 ${e}, 내비게이터는 ${r} 입니다.`,children:(0,o.jsx)(K.q,{children:(0,o.jsxs)(de,{children:[(0,o.jsxs)(me,{children:[(0,o.jsx)(ge,{"aria-hidden":"true",children:"💻"}),(0,o.jsxs)(pe,{children:[(0,o.jsx)(F,{direction:"top",message:"드라이버는 내비게이터가 설명한 방식대로 실제 코드를 작성하는 역할을 합니다.",children:(0,o.jsx)(fe,{children:"드라이버"})}),(0,o.jsx)(ye,{children:e})]})]}),(0,o.jsxs)(he,{children:[(0,o.jsxs)(pe,{children:[(0,o.jsx)(F,{direction:"top",message:"내비게이터는 코드의 논리적 흐름, 설계, 오류 등을 검토하며, 드라이버에게 피드백을 제공합니다.",children:(0,o.jsx)(xe,{children:"내비게이터"})}),(0,o.jsx)(be,{children:r})]}),(0,o.jsx)(ge,{"aria-hidden":"true",children:"🧭"})]})]})})});var $e=t(37),ve=t(7545),we=t(2947),Ae=t(3847),ke=t(7665),Ce=t(7097),Se=t(4994),Ee=t(5778);const Oe=()=>{const e=(0,ke.jE)(),{addToast:r}=(0,m.A)(),{mutate:t}=(0,Ce.n)({mutationFn:Se.Ah,onSuccess:()=>e.invalidateQueries({queryKey:[Ee.e.GET_CATEGORIES]}),onError:e=>r({status:"ERROR",message:e.message})}),{mutate:o}=(0,Ce.n)({mutationFn:Se.st,onSuccess:()=>(r({status:"SUCCESS",message:"카테고리가 수정되었습니다."}),e.invalidateQueries({queryKey:[Ee.e.GET_CATEGORIES]})),onError:e=>r({status:"ERROR",message:e.message})}),{mutate:i}=(0,Ce.n)({mutationFn:Se.K7,onSuccess:()=>(r({status:"SUCCESS",message:"카테고리가 삭제되었습니다."}),e.invalidateQueries({queryKey:[Ee.e.GET_CATEGORIES]})),onError:e=>r({status:"ERROR",message:e.message})});return{addCategoryMutation:t,updateCategoryMutation:o,deleteCategoryMutation:i}};var ze=t(4010);const Re=(e,r,t)=>e.length>10?{status:"ERROR",message:"10자 이하로 입력해 주세요"}:t===e?{status:"ERROR",message:"이전과 동일한 카테고리 이름입니다. 다른 이름을 입력해 주세요."}:r(e)||e===ze.vz?{status:"ERROR",message:"중복된 카테고리 입니다."}:{status:"DEFAULT",message:""},Me=u.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  width: 100%;
`,Te=u.Ay.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;

  img {
    width: 2rem;
    height: 2rem;
  }
`,Ie=u.Ay.div`
  display: flex;
  gap: 0.6rem;
`,De=u.Ay.li`
  display: flex;
  align-items: center;

  width: 100%;
  height: 4.4rem;
  padding: 0 1.2rem;
  border: 1px solid ${({theme:e})=>e.color.black[200]};
  border-radius: 0.5rem;

  background-color: ${({theme:e,$isChecked:r})=>r?e.color.primary[800]:e.color.black[0]};
  color: ${({theme:e,$isChecked:r})=>r?e.color.black[0]:e.color.black[700]};
  font-size: ${({theme:e})=>e.fontSize.md};

  transition: all 0.2s ease-out;

  &:hover {
    background-color: ${({theme:e})=>e.color.primary[800]};
    color: ${({theme:e})=>e.color.black[0]};
  }
`,Ne=(u.AH`
  top: 4rem;

  font-size: 1rem;
`,({accessCode:e,categoryId:r,categoryName:t,isChecked:s,closeModal:n,handleSelectCategory:a})=>{const{newCategoryName:d,handleCategoryName:c,isEditing:h,startEditing:g,stopEditing:u,updateCategoryName:f,deleteCategoryName:x}=((e,r,t)=>{const[o,s]=(0,i.useState)(!1),{value:n,handleChange:a,resetValue:l,message:d,status:c}=(0,Ae.A)(t),{isCategoryExist:m}=(0,ze.Ay)(e),{updateCategoryMutation:h,deleteCategoryMutation:g}=Oe(),p=()=>{l(),s(!1)};return{newCategoryName:{value:n,message:d,status:c},handleCategoryName:(e,r)=>{a(e,Re(e.target.value,m,r))},isEditing:o,startEditing:()=>s(!0),stopEditing:p,updateCategoryName:async()=>{n!==t?(h({categoryId:r,updatedCategoryName:n,accessCode:e}),p()):p()},deleteCategoryName:async()=>{g({categoryId:r,accessCode:e})}}})(e,r,t),{addToast:y}=(0,m.A)();return h?(0,o.jsx)("form",{onSubmit:async e=>{e.preventDefault(),await f()},children:(0,o.jsxs)(Me,{children:[(0,o.jsx)(we.A,{height:"4.4rem",placeholder:"수정할 카테고리 이름을 입력해 주세요.",value:d.value,status:d.status,onChange:e=>c(e,t)}),(0,o.jsxs)(Ie,{children:[(0,o.jsx)(W.A,{icon:(0,o.jsx)($e.H6t,{}),color:p.w.color.primary[800],type:"submit",size:"md"}),(0,o.jsx)(W.A,{icon:(0,o.jsx)($e.wwB,{}),color:p.w.color.primary[800],onClick:u,size:"md"})]})]})}):(0,o.jsxs)(Me,{children:[(0,o.jsxs)(Te,{id:r,onClick:e=>{s||(a(e.currentTarget.id),y({status:"SUCCESS",message:`${t}가 선택되었어요.`}),n())},children:[(0,o.jsx)("img",{src:s?l.hk:l.GI,alt:s?"체크됨":"체크되지 않음"}),(0,o.jsx)(De,{$isChecked:s,children:(0,o.jsx)("p",{children:t})})]}),r!==ze.zb&&(0,o.jsxs)(Ie,{children:[(0,o.jsx)(W.A,{onClick:g,icon:(0,o.jsx)($e.H6t,{}),color:p.w.color.primary[800],size:"md"}),(0,o.jsx)(W.A,{onClick:async()=>{await x(),s&&a(ze.zb)},icon:(0,o.jsx)($e.Mst,{}),color:p.w.color.danger[500],size:"md"})]})]})}),Fe=u.Ay.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,_e=u.Ay.ul`
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;

  width: 100%;
`,Ge=u.Ay.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
`,Ue=({accessCode:e,isOpen:r,closeModal:t,categories:i,isCategoryExist:s,selectedCategoryId:n,handleSelectedCategoryId:a})=>{const{value:l,handleChange:m,resetValue:h,message:g,status:u}=(0,Ae.A)(""),{addCategoryMutation:f}=Oe(),x=()=>{h(),t()};return(0,o.jsxs)(c.a,{isOpen:r,close:x,size:"50rem",children:[(0,o.jsx)(c.a.Header,{children:(0,o.jsx)(Fe,{children:(0,o.jsx)("p",{children:"카테고리 선택하기"})})}),(0,o.jsx)(c.a.Body,{children:(0,o.jsx)(_e,{children:i.map((r=>(0,o.jsx)(Ne,{isChecked:r.id===n,accessCode:e,closeModal:x,categoryId:r.id,categoryName:r.value,handleSelectCategory:a},r.id)))})}),(0,o.jsx)(Ge,{onSubmit:r=>{r.preventDefault(),"ERROR"!==u&&f({category:l,accessCode:e},{onSuccess:h})},children:(0,o.jsxs)(ve.F,{gap:"0.5rem",children:[(0,o.jsxs)(ve.F.Content,{children:[(0,o.jsx)(ve.F.Input,{value:l,placeholder:"추가할 카테고리를 입력해 주세요.",height:"4.4rem",status:u,onChange:e=>m(e,Re(e.target.value,s))}),(0,o.jsx)(d.A,{type:"submit",width:"4.8rem",height:"4.4rem",fontSize:p.w.fontSize.lg,rounded:!0,disabled:""===l.trim()||"DEFAULT"!==u,children:(0,o.jsx)($e._rf,{size:"1.6rem"})})]}),(0,o.jsx)(ve.F.Message,{status:u,children:g})]})}),(0,o.jsx)(c.a.CloseButton,{close:x})]})};var qe=t(640),He=t(7701);const We=()=>{const e=(0,ke.jE)(),{addToast:r}=(0,m.A)(),{mutate:t}=(0,Ce.n)({mutationFn:He.F0,onSuccess:()=>(r({status:"SUCCESS",message:"링크가 추가되었습니다."}),e.invalidateQueries({queryKey:[Ee.e.GET_REFERENCE_LINKS]})),onError:e=>r({status:"ERROR",message:e.message})}),{mutate:o}=(0,Ce.n)({mutationFn:He.Tc,onSuccess:()=>(r({status:"SUCCESS",message:"링크가 삭제되었습니다."}),e.invalidateQueries({queryKey:[Ee.e.GET_REFERENCE_LINKS]})),onError:e=>r({status:"ERROR",message:e.message})});return{addReferenceMutation:t,deleteReferenceMutation:o}};var Le=t(8198);const Ke=u.Ay.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;
  min-height: 6rem;
  padding: 0 2rem;

  border-top: 1px solid ${({theme:e})=>e.color.black[100]};
`,Pe=u.Ay.form`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 80%;
`,Qe=(u.Ay.div`
  display: flex;
  gap: 0.6rem;
`,({accessCode:e,categories:r})=>{const[t,s]=(0,i.useState)(null),{value:n,status:a,handleChange:l,resetValue:c}=(0,Ae.A)(),{addReferenceMutation:m}=We();return(0,o.jsxs)(Ke,{children:[(0,o.jsx)(qe.m,{width:"17rem",height:"4rem",gap:"4.6rem",direction:"UPPER",placeholder:"카테고리를 선택해 주세요.",options:r,selectedOption:(0,Le.r)(r,t||"")||ze.vz,onSelect:e=>s(e)}),(0,o.jsxs)(Pe,{onSubmit:r=>{r.preventDefault();const o=(e=>{if(!e)return"";const r=e.trim();return r.startsWith("http://")||r.startsWith("https://")?r:`https://${r}`})(n),i=t===ze.zb?null:t;m({url:o,accessCode:e,categoryId:i},{onSuccess:c})},children:[(0,o.jsx)(we.A,{height:"4rem",borderRadius:"0.6rem",placeholder:"링크를 입력해주세요.",value:n,status:a,onChange:l}),(0,o.jsx)(d.A,{width:"4.4rem",height:"4rem",borderRadius:"0.6rem",type:"submit","aria-label":"링크 추가하기 버튼",rounded:!0,disabled:""===n.trim()||"DEFAULT"!==a,children:(0,o.jsx)($e._rf,{size:"1.6rem",role:"presentation"})})]})]})});var Ve=t(5238);const Ye=(0,u.Ay)(Ve.AOl)`
  width: 2rem;
  height: 2rem;

  color: ${({$color:e})=>e};

  cursor: help;

  &:hover {
    transform: scale(1.1);
    transition: all 0.1s ease-out;
  }
`,Be=({color:e=p.w.color.primary[900],boxColor:r=p.w.color.primary[900],boxDirection:t="bottom",...i})=>(0,o.jsx)(F,{direction:t,color:r,...i,children:(0,o.jsx)(Ye,{$color:e,role:"presentation"})}),Xe=u.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({theme:e})=>e.fontSize.lg};

  cursor: pointer;
`,Ze=u.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`,Je=({isOpen:e,selectedCategoryName:r,toggleIsOpen:t,onButtonClick:i})=>(0,o.jsxs)(Xe,{"aria-label":e?"링크 카드 열림":"링크 카드 닫힘, 클릭하시면 링크 카드가 열립니다.",onClick:t,children:[(0,o.jsxs)(Ze,{children:[e?(0,o.jsx)(L.CJN,{size:p.w.fontSize.h6,color:p.w.color.primary[600],role:"presentation"}):(0,o.jsx)(L.Ik,{size:p.w.fontSize.h6,color:p.w.color.primary[600],role:"presentation"}),(0,o.jsx)("p",{children:"링크"}),(0,o.jsx)(Be,{message:"페어 프로그래밍을 진행하면서 도움이 되었던 레퍼런스 링크를 저장해 보세요.",color:p.w.color.black[300],boxDirection:"right"})]}),(0,o.jsx)(d.A,{size:"sm",borderRadius:"3rem","aria-label":`현재 카테고리는 ${r} 입니다. 클릭하시면 카테고리 선택 모달이 열립니다.`,onClick:e=>{e.stopPropagation(),i(),t()},children:r})]});var er=t(9879);const rr=u.Ay.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: ${({$columns:e})=>e>2&&"center"};
  gap: 1rem;
  overflow-y: auto;

  padding: 3rem;
`,tr=u.Ay.div`
  flex-grow: 1;

  height: 0;
  padding: 2rem;

  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.md};
`,or=u.Ay.ul`
  gap: 3rem 0;

  width: 100%;
  padding: 0;

  ${({$columns:e})=>e<=2?u.AH`
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
        `:u.AH`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
          place-items: center;
        `}

  li {
    list-style-type: none;
  }
`,ir=u.Ay.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 17rem;
  height: 20rem;
  border: 1px solid ${({theme:e})=>e.color.black[100]};
  border-radius: 1.5rem;
`,sr=u.Ay.img`
  width: 100%;
  height: 10rem;

  object-fit: cover;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`,nr=u.Ay.div`
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
`,ar=u.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow: hidden;

  width: 100%;
  height: 10rem;
  max-height: 12rem;
  padding: 1.5rem;

  cursor: pointer;
`,lr=u.Ay.p`
  overflow: hidden;

  width: 100%;

  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`,dr=u.Ay.p`
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
`,cr=(0,u.Ay)(er.m6K)`
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
`,mr=({references:e,accessCode:r})=>{const{deleteReferenceMutation:t}=We();if(!e||e.length<1)return(0,o.jsx)(tr,{children:"저장된 링크가 없습니다."});const i=e.length;return(0,o.jsx)(rr,{$columns:i,children:(0,o.jsx)(or,{$columns:i,children:e.map((e=>(0,o.jsxs)(ir,{children:[(0,o.jsx)(cr,{onClick:()=>t({id:e.id,accessCode:r})}),(0,o.jsxs)(J.N_,{to:e.url,target:"_blank",children:[e.image?(0,o.jsx)(sr,{alt:"link",src:e.image}):(0,o.jsxs)(nr,{children:["이미지가",(0,o.jsx)("br",{}),"없습니다"]}),(0,o.jsxs)(ar,{children:[(0,o.jsx)(lr,{children:e.openGraphTitle||e.headTitle}),(0,o.jsx)(dr,{children:e.description})]})]})]},e.id)))})})},hr=u.Ay.div`
  min-width: 49rem;
  max-height: calc(100vh - 23rem);
`,gr=u.Ay.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: ${({$isOpen:e})=>e?"calc(100vh - 25rem)":"0"};

  transition: height 0.3s;

  border-top: ${({$isOpen:e,theme:r})=>e&&`1px solid ${r.color.black[100]}`};
`,pr=(u.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 100%;
  min-height: 6rem;

  border-top: 1px solid ${({theme:e})=>e.color.black[100]};
`,({accessCode:e,isOpen:r,toggleIsOpen:t,references:s})=>{const[n,a]=(0,i.useState)(ze.zb),{isModalOpen:l,openModal:d,closeModal:c}=(0,ie.A)(),{categories:m,isCategoryExist:h}=(0,ze.Ay)(e),g=(0,Le.r)(m,n)||ze.vz;return(0,o.jsxs)(hr,{children:[(0,o.jsxs)(K.q,{children:[(0,o.jsx)(Je,{isOpen:r,selectedCategoryName:g,toggleIsOpen:t,onButtonClick:d}),(0,o.jsxs)(gr,{$isOpen:r,children:[(0,o.jsx)(mr,{references:s||[],accessCode:e}),(0,o.jsx)(Qe,{accessCode:e,categories:m})]})]}),(0,o.jsx)(Ue,{accessCode:e,isOpen:l,closeModal:c,categories:m,isCategoryExist:h,selectedCategoryId:n,handleSelectedCategoryId:e=>a(e)})]})});var ur=t(1066),fr=t(6915);const xr=async({duration:e,accessCode:r})=>{await fr.A.patch({url:`undefined/${r}/timer`,body:JSON.stringify({duration:60*Number(e)*1e3,remainingTime:60*Number(e)*1e3}),errorMessage:""})};var yr=t(5260);const br=u.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`,jr=u.i7`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,$r=u.Ay.div`
  padding: 1.5rem 2rem;
  border: 1px solid ${({theme:e})=>e.color.black[100]};
  border-radius: 1rem;

  background: ${({theme:e})=>e.color.black[0]};

  animation: ${jr} 0.3s ease-out;
`,vr=u.Ay.p`
  margin-bottom: 0.5rem;

  color: ${({theme:e})=>e.color.black[500]};
  font-size: ${({theme:e})=>e.fontSize.sm};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,wr=u.Ay.form`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    font-size: ${({theme:e})=>e.fontSize.sm};
    font-weight: ${({theme:e})=>e.fontWeight.medium};
  }
`,Ar=u.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,kr=({isActive:e})=>{const r=(0,i.useRef)(null),{accessCode:t}=(0,s.g)(),{addToast:n}=(0,m.A)(),{isModalOpen:a,openModal:l,closeModal:c}=(0,ie.A)(),{value:h,handleChange:g,resetValue:u}=(0,Ae.A)(),{updateTimerDurationMutation:f}=(()=>{const{addToast:e}=(0,m.A)(),{mutate:r,isPending:t}=(0,Ce.n)({mutationFn:xr,onSuccess:()=>e({status:"SUCCESS",message:"타이머 시간이 성공적으로 변경되었습니다."}),onError:r=>e({status:"ERROR",message:r.message})});return{updateTimerDurationMutation:r,isPending:t}})();(0,ur.A)(r,(()=>c()));const x=""===h||!(0,yr.W)(h);return(0,o.jsxs)(br,{children:[(0,o.jsx)(W.A,{icon:(0,o.jsx)(H.GD,{}),color:p.w.color.secondary[500],size:"md",onClick:()=>{e?n({status:"ERROR",message:"타이머 작동 중에는 타이머 시간을 변경할 수 없습니다."}):l()},"aria-label":"타이머 시간 수정 버튼"}),a&&(0,o.jsxs)($r,{ref:r,children:[(0,o.jsx)(vr,{children:"타이머 시간 변경"}),(0,o.jsxs)(wr,{onSubmit:e=>{e.preventDefault(),h&&t&&(f({duration:h,accessCode:t}),u(),c())},"aria-label":"타이머 시간을 분 단위로 입력해 주세요.",children:[(0,o.jsx)(we.A,{id:"timer",value:h,placeholder:"타이머 시간 (분)",onChange:g}),(0,o.jsxs)(Ar,{children:[(0,o.jsx)(d.A,{type:"button",color:"secondary",size:"sm",filled:!1,rounded:!0,onClick:c,children:"닫기"}),(0,o.jsx)(d.A,{type:"submit",color:"secondary",size:"sm",rounded:!0,disabled:x,children:"완료"})]})]})]})]})},Cr=(e,r,t,o)=>{const n=(0,s.Zp)(),a=(0,ke.jE)(),d=(0,i.useRef)(new Audio(l.bB)),[c,h]=(0,i.useState)(t),[g,p]=(0,i.useState)(!1),{addToast:u}=(0,m.A)(),{fireNotification:f}=(()=>{const e=(0,i.useRef)(null),r=r=>{r.preventDefault(),window.focus(),e.current?.close()};return(0,i.useEffect)((()=>{(async()=>{"granted"!==Notification.permission&&await Notification.requestPermission()})()}),[]),{fireNotification:(t,o,i)=>{if("granted"!==Notification.permission||document.hasFocus())console.warn("알림 권한이 허용되지 않았습니다.");else{const s={body:o||" ",badge:l.f,icon:l.f,...i},n=new Notification(t,s);e.current=n,n.onclick=r}}}})();return(0,i.useEffect)((()=>{const t=(e=>new WebSocket(`undefined/wss-connect?accesscode=${e}`))(e),i=t=>{console.log("Received event:",t.data);const i=JSON.parse(t.data);((t,i)=>{switch(t){case"timer":(r=>{switch(r){case"complete":n(`/room/${e}/retrospectForm`,{state:{valid:!0}}),u({status:"WARNING",message:"페어룸이 종료되었습니다."});break;case"start":case"running":p(!0),u({status:"SUCCESS",message:"타이머가 시작되었습니다."});break;case"pause":p(!1),u({status:"WARNING",message:"타이머가 일시 정지되었습니다."});break;case"update":a.invalidateQueries({queryKey:[Ee.e.GET_PAIR_ROOM_TIMER]}),u({status:"WARNING",message:"타이머 시간이 변경되었습니다."});break;default:console.warn(`Unhandled timer event data: ${r}`)}})(i);break;case"remaining-time":(e=>{"0"===e?(u({status:"SUCCESS",message:"타이머가 종료되었습니다."}),p(!1),h(r),o(),u({status:"INFO",message:"드라이버 / 내비게이터 역할을 바꿔 주세요!"}),d.current.play(),f("타이머가 끝났어요!","드라이버 / 내비게이터 역할을 바꿔 주세요!",{requireInteraction:!0})):h(Number(e))})(i);break;default:console.warn(`Unhandled event: ${t}`)}})(i.event,i.data)},s=e=>{e.preventDefault()};return t.onopen=()=>{console.log("WebSocket connection opened"),t.addEventListener("message",i)},t.onerror=e=>{console.error("WebSocket connection error:",e)},window.addEventListener("beforeunload",s),()=>{t.removeEventListener("message",i),t.close(),window.removeEventListener("beforeunload",s)}}),[]),{timeLeft:c,isActive:g,handleStart:()=>{g||(async e=>{await fr.A.patch({url:`undefined/${e}/timer/start`,errorMessage:""})})(e)},handlePause:()=>{(async e=>{await fr.A.patch({url:`undefined/${e}/timer/stop`,errorMessage:""})})(e)}}};var Sr=t(2657);const Er=e=>e<10?`0${e}`:`${e}`,Or=e=>e<10?`0${e}`:`${e}`,zr=u.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  min-width: 60rem;
  height: 100%;
  padding: 2rem;
`,Rr=u.Ay.div.attrs((({theme:e,$progress:r})=>({style:{backgroundImage:`linear-gradient(white, white), \n      conic-gradient(${e.color.primary[600]} ${r}%, ${e.color.black[300]} ${r}%)`}})))`
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
`,Mr=u.Ay.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`,Tr=u.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  width: 10rem;

  font-size: ${({theme:e})=>e.fontSize.sm};
`,Ir=u.Ay.p`
  font-size: 7rem;
`,Dr=u.Ay.div`
  display: flex;
  gap: 5rem;
`,Nr=({accessCode:e,defaultTime:r,defaultTimeleft:t,onTimerStop:s})=>{const{timeLeft:n,isActive:l,handleStart:d,handlePause:c}=Cr(e,r,t,s);(0,i.useRef)(n).current=n;const{minutes:m,seconds:h}=(e=>{const r=Math.floor(e/6e4),t=Math.floor(e%6e4/1e3);return{minutes:Er(r),seconds:Or(t)}})(n);return(0,Sr.A)(m,h),(0,o.jsx)(K.q,{children:(0,o.jsxs)(zr,{"aria-label":"타이머",children:[(0,o.jsx)(Rr,{$progress:n/r*100,role:"timer","aria-label":`현재 남은 시간은 ${m}분 ${h}초 입니다.`,children:(0,o.jsxs)(Mr,{"aria-label":`${m}분 ${h}초`,children:[(0,o.jsxs)(Tr,{"aria-hidden":"true",children:[(0,o.jsx)(Ir,{children:m}),"분(m)"]}),(0,o.jsx)(Ir,{"aria-hidden":"true",children:":"}),(0,o.jsxs)(Tr,{"aria-hidden":"true",children:[(0,o.jsx)(Ir,{children:h}),"초(s)"]})]})}),(0,o.jsxs)(Dr,{children:[(0,o.jsx)(W.A,{icon:(0,o.jsx)(a.gSK,{role:"presentation"}),size:"lg",color:p.w.color.secondary[500],disabled:l,onClick:d,"aria-label":"타이머 시작하기"}),(0,o.jsx)(W.A,{icon:(0,o.jsx)(a.kwt,{role:"presentation"}),size:"lg",color:p.w.color.secondary[500],disabled:!l,onClick:c,"aria-label":"타이머 중지하기"})]}),(0,o.jsx)(kr,{isActive:l})]})})},Fr=u.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({theme:e})=>e.fontSize.lg};

  cursor: pointer;
`,_r=({isOpen:e,toggleIsOpen:r})=>(0,o.jsxs)(Fr,{"aria-label":e?"투두 리스트 카드 열림":"투두 리스트 카드 닫힘, 클릭하시면 투두 리스트 카드가 열립니다.",onClick:r,children:[e?(0,o.jsx)(L.tF0,{size:p.w.fontSize.h6,color:p.w.color.primary[600],role:"presentation"}):(0,o.jsx)(L.pte,{size:p.w.fontSize.h6,color:p.w.color.primary[600],role:"presentation"}),(0,o.jsx)("p",{children:"투두 리스트"}),(0,o.jsx)(Be,{message:"페어 프로그래밍을 위해 필요한 할 일 목록을 작성해 보세요. 할 일을 더욱 효율적으로 관리할 수 있습니다.",color:p.w.color.black[300],boxDirection:"right"})]}),Gr=u.Ay.div`
  display: flex;

  cursor: pointer;
`,Ur=u.Ay.input`
  display: none;
`,qr=u.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;
  border: 1px solid ${({$isChecked:e,theme:r})=>e?r.color.black[400]:r.color.secondary[400]};
  border-radius: 4px;

  background-color: ${({$isChecked:e,theme:r})=>e?r.color.black[300]:r.color.secondary[200]};

  transition: all 0.1s ease 0s;

  &:hover {
    background-color: ${({theme:e,$isChecked:r})=>r?e.color.black[400]:e.color.secondary[300]};
  }
`,Hr=({isChecked:e,onClick:r})=>(0,o.jsxs)(Gr,{onClick:r,children:[(0,o.jsx)(Ur,{type:"checkbox",checked:e,readOnly:!0}),(0,o.jsx)(qr,{$isChecked:e,children:e&&(0,o.jsx)(er.g9_,{size:"1.8rem",color:p.w.color.black[0]})})]});var Wr=t(1534);const Lr=()=>{const e=(0,ke.jE)(),{addToast:r}=(0,m.A)(),{mutate:t}=(0,Ce.n)({mutationFn:Wr.V8,onSuccess:()=>e.invalidateQueries({queryKey:[Ee.e.GET_TODOS]}),onError:e=>r({status:"ERROR",message:e.message})}),{mutate:o}=(0,Ce.n)({mutationFn:Wr.gc,onSuccess:()=>e.invalidateQueries({queryKey:[Ee.e.GET_TODOS]}),onError:e=>r({status:"ERROR",message:e.message})}),{mutate:i}=(0,Ce.n)({mutationFn:Wr.iY,onSuccess:()=>e.invalidateQueries({queryKey:[Ee.e.GET_TODOS]}),onError:e=>r({status:"ERROR",message:e.message})}),{mutate:s}=(0,Ce.n)({mutationFn:Wr.dw,onSuccess:()=>e.invalidateQueries({queryKey:[Ee.e.GET_TODOS]}),onError:e=>r({status:"ERROR",message:e.message})}),{mutate:n}=(0,Ce.n)({mutationFn:Wr.Ys,onSuccess:()=>e.invalidateQueries({queryKey:[Ee.e.GET_TODOS]}),onError:e=>r({status:"ERROR",message:e.message})});return{addTodosMutation:t,updateContentsMutation:o,updateOrderMutation:i,updateCheckedMutation:s,deleteTodoMutation:n}},Kr=u.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;

  padding: 1.6rem;
  border-radius: 1rem;

  background: ${({$isChecked:e,$isDraggedOver:r,theme:t})=>e?r?t.color.black[200]:t.color.black[100]:r?t.color.secondary[100]:t.color.secondary[50]};
  font-size: ${({theme:e})=>e.fontSize.md};

  transition: background 0.1s ease;

  cursor: pointer;

  &:hover {
    background: ${({$isChecked:e,$isIconHovered:r,theme:t})=>!r&&(e?t.color.black[200]:t.color.secondary[100])};
  }
`,Pr=u.Ay.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  p {
    text-decoration: ${({$isChecked:e})=>e&&"line-through"};
    word-break: break-all;

    transition: text-decoration 0.1s ease;
  }
`,Qr=u.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`,Vr=(0,u.Ay)(Ve.$6X)`
  width: 1.7rem;
  height: 1.7rem;

  color: ${({$isChecked:e,theme:r})=>e?r.color.black[300]:r.color.secondary[400]};

  transition: color 0.1s ease;

  &:hover {
    color: ${({$isChecked:e,theme:r})=>e?r.color.black[400]:r.color.secondary[500]};
  }
`,Yr=(0,u.Ay)(Ve.F23)`
  width: ${({theme:e})=>e.fontSize.lg};
  height: ${({theme:e})=>e.fontSize.lg};

  color: ${({$isChecked:e,theme:r})=>e?r.color.black[300]:r.color.secondary[400]};

  transition: color 0.1s ease;

  &:hover {
    color: ${({$isChecked:e,theme:r})=>e?r.color.black[400]:r.color.secondary[400]};
  }
`,Br=({todo:e,isDraggedOver:r,onDragStart:t,onDragEnter:s,onDrop:n})=>{const[a,l]=(0,i.useState)(!1),[,d]=(0,g.A)(),{updateCheckedMutation:c,deleteTodoMutation:m}=Lr(),{id:h,isChecked:p,content:u}=e;return(0,o.jsxs)(Kr,{$isChecked:p,$isIconHovered:a,$isDraggedOver:r,draggable:!0,onDragStart:()=>t(h),onDragEnter:()=>s(h),onDragOver:e=>e.preventDefault(),onDragEnd:n,children:[(0,o.jsxs)(Pr,{$isChecked:p,children:[(0,o.jsx)(Hr,{isChecked:p,onClick:()=>c({todoId:h})}),(0,o.jsx)("p",{children:u})]}),(0,o.jsxs)(Qr,{children:[(0,o.jsx)(Vr,{$isChecked:p,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onClick:()=>d(u)}),(0,o.jsx)(Yr,{$isChecked:p,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onClick:()=>m({todoId:h})})]})]})},Xr=u.Ay.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;

  padding: 2rem;
`,Zr=u.Ay.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`,Jr=u.Ay.p`
  color: ${({theme:e})=>e.color.black[300]};
  font-size: ${({theme:e})=>e.fontSize.sm};
`,et=u.Ay.p`
  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.md};
`,rt=({todos:e})=>{const{updateOrderMutation:r}=Lr(),{dragOverItem:t,handleDragStart:s,handleDragEnter:n,handleDrop:a}=((e,r)=>{const[t,o]=(0,i.useState)(null),[s,n]=(0,i.useState)(null);return{dragItem:t,dragOverItem:s,handleDragStart:r=>o(e.find((e=>e.id===r))||null),handleDragEnter:r=>n(e.find((e=>e.id===r))||null),handleDrop:e=>{e.preventDefault(),t&&s&&t.id!==s.id&&(r(t.id,s.order),o(null),n(null))}}})(e,((e,t)=>{r({todoId:e,order:t})}));return(0,o.jsx)(Xr,{children:e.length>0?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(Jr,{children:["총 ",e.length,"개"]}),(0,o.jsx)(Zr,{children:e.map((e=>(0,o.jsx)(Br,{todo:e,isDraggedOver:t?.id===e.id,onDragStart:s,onDragEnter:n,onDrop:a},e.id)))})]}):(0,o.jsx)(et,{children:"저장된 투두 리스트가 없습니다."})})},tt=u.AH`
  height: 4rem;
  border-radius: 0.6rem;
`,ot=u.Ay.div`
  min-width: 49rem;
`,it=u.Ay.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: ${({$isOpen:e})=>e?"calc(100vh - 25rem)":"0"};

  transition: height 0.3s;

  border-top: ${({$isOpen:e,theme:r})=>e&&`1px solid ${r.color.black[100]}`};
`,st=u.Ay.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 6rem;
  min-height: 6rem;
  border-radius: 0 0 1.5rem 1.5rem;

  background-color: ${({theme:e})=>e.color.black[0]};
  border-top: 1px solid ${({theme:e})=>e.color.black[100]};
`,nt=u.Ay.form`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 100%;
  padding: 0 2rem;
`,at=({isOpen:e,toggleIsOpen:r,todos:t})=>{const{accessCode:i}=(0,s.g)(),{value:n,handleChange:a,resetValue:l}=(0,Ae.A)(),{addTodosMutation:c}=Lr();return(0,o.jsx)(ot,{children:(0,o.jsxs)(K.q,{children:[(0,o.jsx)(_r,{isOpen:e,toggleIsOpen:r}),(0,o.jsxs)(it,{$isOpen:e,children:[(0,o.jsx)(rt,{todos:t}),(0,o.jsx)(st,{children:(0,o.jsxs)(nt,{onSubmit:e=>{e.preventDefault(),c({content:n,accessCode:i||""},{onSuccess:l})},children:[(0,o.jsx)(we.A,{height:"4rem",borderRadius:"0.6rem",$css:tt,value:n,onChange:a,maxLength:100,placeholder:"할 일의 내용을 입력해 주세요."}),(0,o.jsx)(d.A,{width:"4.4rem",height:"4rem",borderRadius:"0.6rem",type:"submit","aria-label":"투두 리스트 추가하기",rounded:!0,disabled:""===n.trim(),children:(0,o.jsx)($e._rf,{size:"1.6rem",role:"presentation"})})]})})]})]})})};var lt=t(3795);const dt=u.Ay.div`
  display: flex;
  gap: 2rem;

  min-width: fit-content;
  height: calc(100vh - 7rem);
  min-height: 60rem;
  padding: 2rem;

  background: ${({theme:e})=>e.color.primary[50]};
`,ct=(u.Ay.div`
  display: flex;
  gap: 2rem;

  min-width: fit-content;
  height: calc(100vh - 7rem);
  min-height: 60rem;
  padding: 2rem;

  background: ${({theme:e})=>e.color.primary[50]};
`,u.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  min-height: 56rem;
  max-height: calc(100vh - 11rem);
`),mt=()=>{const e=(0,s.Zp)(),{accessCode:r}=(0,s.g)(),[t,a]=(0,i.useState)(""),[l,d]=(0,i.useState)(""),[c,m]=(0,i.useState)(!1),{isModalOpen:h,closeModal:g}=(0,ie.A)(!0),{driver:p,navigator:u,status:f,missionUrl:x,duration:y,remainingTime:b,isFetching:j,todos:$,references:v}=(0,lt.A)(r||""),{updatePairRoleMutation:A}=(0,se.A)();return(0,i.useEffect)((()=>{"COMPLETED"===f&&e(`/room/${r}/completed`,{state:{valid:!0},replace:!0})}),[f]),(0,i.useEffect)((()=>{a(p),d(u)}),[p,u]),j?(0,o.jsx)(n.A,{}):(0,o.jsxs)(dt,{children:[(0,o.jsx)(ae,{driver:t,navigator:l,missionUrl:x,accessCode:r||""}),(0,o.jsxs)(ct,{children:[(0,o.jsx)(je,{driver:t,navigator:l}),(0,o.jsx)(Nr,{accessCode:r||"",defaultTime:y,defaultTimeleft:b,onTimerStop:()=>A({accessCode:r||""})})]}),(0,o.jsxs)(ct,{children:[(0,o.jsx)(at,{isOpen:!c,toggleIsOpen:()=>m(!1),todos:$}),(0,o.jsx)(pr,{accessCode:r||"",isOpen:c,toggleIsOpen:()=>m(!0),references:v})]}),(0,o.jsx)(w,{isOpen:h,close:g,accessCode:r||""})]})}}}]);
//# sourceMappingURL=597.js.map