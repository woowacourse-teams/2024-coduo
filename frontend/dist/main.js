!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t=(new Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="2079977b-ad91-4c9b-9311-dbbe20e6eff2",e._sentryDebugIdIdentifier="sentry-dbid-2079977b-ad91-4c9b-9311-dbbe20e6eff2")}catch(e){}}();var _global="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};_global.SENTRY_RELEASE={id:"550fb57d92c04837d719efcb8092f107163acda9"},(()=>{"use strict";var e,t,i,r,o,n={9497:(e,t,i)=>{i.d(t,{A:()=>a});var r=i(1354),o=i.n(r),n=i(6314),s=i.n(n)()(o());s.push([e.id,"html {\n  font-family: 'Pretendard Variable';\n  font-size: 62.5%;\n\n  @media screen and (max-width: 768px) {\n    font-size: 50%;\n  }\n}\n\nbody {\n  font-family: 'Pretendard Variable';\n}\n","",{version:3,sources:["webpack://./src/styles/font.css"],names:[],mappings:"AAAA;EACE,kCAAkC;EAClC,gBAAgB;;EAEhB;IACE,cAAc;EAChB;AACF;;AAEA;EACE,kCAAkC;AACpC",sourcesContent:["html {\n  font-family: 'Pretendard Variable';\n  font-size: 62.5%;\n\n  @media screen and (max-width: 768px) {\n    font-size: 50%;\n  }\n}\n\nbody {\n  font-family: 'Pretendard Variable';\n}\n"],sourceRoot:""}]);const a=s},4994:(e,t,i)=>{i.d(t,{Ah:()=>s,K7:()=>a,bW:()=>n,st:()=>l});var r=i(6915),o=i(3413);const n=async e=>{const t=await r.A.get({url:`undefined/${e}/category`,errorMessage:o.U.GET_CATEGORIES});return await t.json()},s=async({category:e,accessCode:t})=>{const i=await r.A.post({url:`undefined/${t}/category`,body:JSON.stringify({value:e}),errorMessage:o.U.ADD_CATEGORY});return await i.json()},a=async({categoryId:e,accessCode:t})=>{await r.A.delete({url:`undefined/${t}/category/${e}`})},l=async({categoryId:e,updatedCategoryName:t,accessCode:i})=>{await r.A.patch({url:`undefined/${i}/category`,body:JSON.stringify({categoryId:e,updatedCategoryName:t})})}},6915:(e,t,i)=>{i.d(t,{A:()=>o});var r=i(4251);const o={async request({url:e,method:t,body:i,headers:o,errorMessage:n}){try{const r=await fetch(e,{method:t,headers:o&&o,body:i&&i,credentials:"include"});if(!r.ok){const e=await r.json();throw new Error(e.message||n)}return r}catch(e){throw e instanceof Error||e.message,r.Cp(e),e}},get(e){return this.request({...e,method:"GET"})},post(e){return this.request({...e,method:"POST",headers:{"Content-Type":"application/json"}})},delete(e){return this.request({...e,method:"DELETE",headers:{"Content-Type":"application/json"}})},patch(e){return this.request({...e,method:"PATCH",headers:{"Content-Type":"application/json"}})},put(e){return this.request({...e,method:"PUT"})}}},1185:(e,t,i)=>{i.d(t,{C_:()=>s,E7:()=>n,FZ:()=>a,Fu:()=>c,LX:()=>d,gJ:()=>l});var r=i(6915),o=i(3413);const n=async e=>{const t=await r.A.get({url:`undefined/pair-room/${e}`,errorMessage:o.U.GET_PAIR_ROOM});return await t.json()},s=async e=>{const t=await r.A.get({url:`undefined/pair-room/exists?access_code=${e}`,errorMessage:o.U.GET_PAIR_ROOM});return await t.json()},a=async({pairId:e,driver:t,navigator:i,missionUrl:o,timerDuration:n,timerRemainingTime:s})=>{const a=await r.A.post({url:"undefined/pair-room",body:JSON.stringify({pairId:e||null,driver:t,navigator:i,missionUrl:o,timerDuration:n,timerRemainingTime:s}),errorMessage:""}),{accessCode:l}=await a.json();return l},l=async({accessCode:e})=>{await r.A.patch({url:`undefined/pair-room/${e}/pair-swap`,errorMessage:""})},c=async({accessCode:e})=>{await r.A.patch({url:`undefined/pair-room/${e}/status`,errorMessage:o.U.UPDATE_PAIR_ROOM_STATUS,body:JSON.stringify({status:"COMPLETED"})})},d=async({accessCode:e})=>{await r.A.delete({url:`undefined/pair-room/${e}`,errorMessage:o.U.DELETE_PAIR_ROOM})}},7701:(e,t,i)=>{i.d(t,{F0:()=>s,Tc:()=>a,fF:()=>n});var r=i(6915),o=i(3413);const n=async({accessCode:e,categoryId:t})=>{const i="0"===t?"":`?categoryId=${t}`,n=await r.A.get({url:`undefined/${e}/reference-link${i}`,errorMessage:o.U.GET_REFERENCE_LINKS});return await n.json()},s=async({url:e,accessCode:t,categoryId:i})=>{await r.A.post({url:`undefined/${t}/reference-link`,body:JSON.stringify({url:e,categoryId:i}),errorMessage:o.U.ADD_REFERENCE_LINKS})},a=async({id:e,accessCode:t})=>{await r.A.delete({url:`undefined/${t}/reference-link/${e}`,errorMessage:o.U.DELETE_REFERENCE_LINKS})}},1534:(e,t,i)=>{i.d(t,{Gg:()=>n,V8:()=>s,Ys:()=>d,dw:()=>c,gc:()=>a,iY:()=>l});var r=i(6915),o=i(3413);const n=async e=>{const t=await r.A.get({url:`undefined/${e}/todos`,errorMessage:o.U.GET_TODOS});return await t.json()},s=async({content:e,accessCode:t})=>{await r.A.post({url:`undefined/${t}/todos`,body:JSON.stringify({content:e}),errorMessage:o.U.ADD_TODO})},a=async({todoId:e,contents:t})=>{await r.A.patch({url:`undefined/todos/${e}/contents`,body:JSON.stringify({contents:t}),errorMessage:o.U.UPDATE_TODO})},l=async({todoId:e,order:t})=>{await r.A.patch({url:`undefined/todos/${e}/order`,body:JSON.stringify({order:t}),errorMessage:o.U.UPDATE_TODO})},c=async({todoId:e})=>{await r.A.patch({url:`undefined/todos/${e}/checked`,errorMessage:o.U.UPDATE_TODO})},d=async({todoId:e})=>{await r.A.delete({url:`undefined/todos/${e}`,errorMessage:o.U.DELETE_TODO})}},6638:(e,t,i)=>{i.d(t,{bB:()=>r,hk:()=>o,GI:()=>n,PU:()=>s,qZ:()=>a,f:()=>l,Xo:()=>c,mD:()=>d});const r=i.p+"f38aa3e1fc3113d91447.mp3",o=i.p+"8d4a99fe2db5a0f02e7f.svg",n=i.p+"a20da7f1c1159dab7a8e.svg",s=(i.p,i.p,i.p,i.p,i.p,i.p,i.p,i.p,i.p,i.p,i.p,i.p,i.p,i.p,i.p+"1c54765895b3a2e6dad3.png"),a=i.p+"925aa8e685ab0217bb34.png",l=(i.p,i.p+"2620d54be04bd4eefa0f.svg"),c=i.p+"b0113b14f1b2ab385328.svg",d=(i.p,i.p+"ea29709f5eca0285dc9c.png");i.p},5617:(e,t,i)=>{i.d(t,{q:()=>l});var r=i(4848),o=i(7581);const n=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({theme:e})=>e.fontSize.lg};
`,s=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`,a=o.Ay.div`
  flex: 1;

  position: relative;

  width: 100%;
  border-radius: 1.5rem;

  background: ${({theme:e})=>e.color.black[0]};
`,l=Object.assign((({children:e})=>(0,r.jsx)(a,{children:e})),{Header:({icon:e,secondIcon:t,title:i,children:o,isOpen:a=!0,toggleIsOpen:l,...c})=>(0,r.jsxs)(n,{$isOpen:a,onClick:l,...c,children:[(0,r.jsxs)(s,{children:[e,(0,r.jsx)("p",{children:i}),t]}),o]})})},563:(e,t,i)=>{i.d(t,{A:()=>c});var r=i(4848),o=i(6540),n=i(7581),s=i(519);const a=n.Ay.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid;
  border-radius: ${({$rounded:e,$borderRadius:t})=>t||(e?"50rem":"0.5rem")};

  transition: all 0.2s;

  ${({$size:e,$width:t,$height:i,$borderRadius:r,$fontSize:o})=>(({size:e,width:t,height:i,borderRadius:r,fontSize:o,fontWeight:s,textAlign:a})=>{const{width:l,height:c,borderRadius:d,fontSize:m}={sm:{width:"6rem",height:"3rem",borderRadius:"3rem",fontSize:"sm"},md:{width:"10rem",height:"4rem",borderRadius:"0.5rem",fontSize:"md"},lg:{width:"15rem",height:"4rem",borderRadius:"1rem",fontSize:"base"},xl:{width:"25rem",height:"6rem",borderRadius:"6rem",fontSize:"h6"}}[e||"md"];return n.AH`
    width: ${t||l};
    height: ${i||c};
    border-radius: ${r||d};

    font-size: ${o||(({theme:e})=>e.fontSize[m])};
    font-weight: ${s||"normal"};
    text-align: ${a||"center"};
  `})({size:e,width:t,height:i,borderRadius:r,fontSize:o})}

  ${({$color:e,$filled:t})=>(({color:e,filled:t})=>{const{base:i,hover:r,active:o,disabled:a}=(0,s.w)(e,t);return n.AH`
    ${i}
    &:hover {
      ${r}
    }

    &:active {
      ${o}
    }

    &:disabled {
      ${a}
    }
  `})({color:e,filled:t})}

  cursor: ${({disabled:e})=>e?"not-allowed":"pointer"};

  ${({$animation:e})=>e&&(({animation:e})=>n.AH`
  &:hover {
    transform: ${e?"scale(1.01)":"none"};
  }

  &:active {
    transform: ${e?"scale(1.02)":"none"};
  }
`)({animation:e})}

  ${e=>e.$css}
`,l=(0,o.forwardRef)((({$css:e,size:t="md",width:i,height:o,borderRadius:n,fontSize:s,fontWeight:l,textAlign:c,filled:d=!0,rounded:m=!1,animation:h=!1,color:u="primary",disabled:p=!1,children:f,...g},x)=>(0,r.jsx)(a,{ref:x,type:"button",$size:t,$width:i,$height:o,$borderRadius:n,$fontSize:s,$fontWeight:l,$textAlign:c,$filled:d,$rounded:m,$animation:h,$color:u,$css:e,disabled:p,...g,children:f})));l.displayName="Button";const c=l},57:(e,t,i)=>{i.d(t,{A:()=>c});var r=i(4848),o=i(563),n=i(7351),s=i(656),a=i(7581);a.AH`
  font-size: ${({theme:e})=>e.fontSize.md};
`,a.AH`
  border-color: ${({theme:e})=>e.color.black[400]};

  background-color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.md};

  &:hover {
    border-color: ${({theme:e})=>e.color.black[300]};

    background-color: ${({theme:e})=>e.color.black[300]};
  }

  &:active {
    border-color: ${({theme:e})=>e.color.black[300]};

    background-color: ${({theme:e})=>e.color.black[300]};
  }
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  width: 100%;
`;const l=a.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding: 2rem 0 3.4rem;

  color: ${({theme:e,$type:t})=>"SUCCESS"===t?e.color.success[700]:e.color.danger[700]};
  font-size: ${({theme:e})=>e.fontSize.md};

  p {
    color: ${({theme:e})=>e.color.black[900]};
    font-size: ${({theme:e})=>e.fontSize.base};
    font-weight: ${({theme:e})=>e.fontWeight.medium};
  }
`,c=({isOpen:e,close:t,type:i="DANGER",title:a,subTitle:c,confirmText:d="확인",onConfirm:m})=>{const{buttonRef:h}=(0,s.A)(e);return(0,r.jsxs)(n.a,{isOpen:e,close:t,size:"fit-content",children:[(0,r.jsx)(n.a.CloseButton,{close:t}),(0,r.jsxs)(l,{$type:i,children:[(0,r.jsx)("p",{children:a}),c]}),(0,r.jsxs)(n.a.Footer,{position:"CENTER",children:[(0,r.jsx)(o.A,{size:"lg",fontSize:"1.4rem",color:"black",onClick:t,children:"취소"}),(0,r.jsx)(o.A,{ref:h,size:"lg",fontSize:"1.4rem",onClick:m,children:d})]})]})}},640:(e,t,i)=>{i.d(t,{m:()=>g});var r=i(4848),o=i(6540),n=i(6512),s=i(1066),a=i(7594),l=i(7581),c=i(1983);const d=l.Ay.div`
  position: relative;

  width: ${({$width:e})=>e};
  height: fit-content;

  background-color: ${a.w.color.black[0]};
`,m=l.Ay.div`
  display: flex;
  flex-direction: ${({$direction:e})=>"LOWER"===e?"column":"column-reverse"};

  button {
    width: 100%;
    height: ${({$height:e})=>e};
    padding: 1.5rem;
    border-radius: 1rem;

    background-color: ${a.w.color.black[0]};
    font-size: ${({$fontSize:e})=>e};

    transition: all 0.2s;

    &:hover {
      background-color: ${a.w.color.black[100]};
      color: ${({$color:e})=>e};
    }

    &:active {
      background-color: ${a.w.color.black[50]};
      color: ${({$color:e})=>e};
    }
  }
`,h=l.Ay.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid ${({$isOpen:e,$isSelected:t,$color:i})=>(t||e)&&i};

  color: ${({$isSelected:e,$color:t})=>e?t:a.w.color.black[300]};

  svg {
    transform: rotate(${({$isOpen:e})=>e?"180":"0"}deg);
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    border-color: ${({$color:e})=>e};
  }

  &:active {
    border-color: ${({$color:e})=>e};
  }
`,u=l.Ay.ul`
  display: flex;
  flex-direction: ${({$direction:e})=>"LOWER"===e?"column":"column-reverse"};
  overflow-y: auto;

  position: absolute;
  top: ${({$direction:e,$gap:t})=>"LOWER"===e&&t};
  bottom: ${({$direction:e,$gap:t})=>"UPPER"===e&&t};
  z-index: ${c.M.DROPDOWN};

  width: 100%;
  max-height: 20rem;
  border-radius: 1rem;

  box-shadow:
    0 0 1px grey,
    1px 1px 2px lightgrey;
  color: ${a.w.color.black[500]};

  button {
    display: flex;
    align-items: center;
  }
`,p={LOWER:(0,r.jsx)(n.pte,{size:a.w.fontSize.lg}),UPPER:(0,r.jsx)(n.Ik,{size:a.w.fontSize.lg})},f=l.Ay.p`
  color: ${({$color:e})=>e};
  font-size: ${({$fontSize:e})=>e};
  font-weight: ${({$fontWeight:e})=>e};
`,g=Object.assign((({options:e,selectedOption:t="",placeholder:i="",width:n="100%",height:l="4.8rem",gap:c="5.4rem",color:f=a.w.color.primary[800],fontSize:g=a.w.fontSize.md,direction:x="LOWER",onSelect:y})=>{const b=(0,o.useRef)(null),[$,v]=(0,o.useState)(!1);(0,s.A)(b,(()=>v(!1)));return(0,r.jsx)(d,{ref:b,$width:n,children:(0,r.jsxs)(m,{$direction:x,$height:l,$color:f,$fontSize:g,children:[(0,r.jsxs)(h,{role:"listbox","aria-label":$?"드롭다운을 닫습니다":"드롭다운을 엽니다",$isOpen:$,$isSelected:!!t,$color:f,onClick:e=>{e.stopPropagation(),v((e=>!e))},children:[t||i,p[x]]}),$&&(0,r.jsx)(u,{$direction:x,$gap:c,children:e.map(((e,i)=>(0,r.jsx)("li",{role:"option","aria-selected":t===e.value,children:(0,r.jsx)("button",{onClick:t=>((e,t)=>{e.stopPropagation(),(e=>{y(e),v(!1)})(t)})(t,e.id),children:e.value})},`${e}_${i}`)))})]})})}),{Label:({message:e,color:t=a.w.color.primary[800],fontSize:i=a.w.fontSize.base,fontWeight:o=a.w.fontWeight.medium})=>(0,r.jsx)(f,{$color:t,$fontSize:i,$fontWeight:o,children:e})})},6872:(e,t,i)=>{i.d(t,{A:()=>l});var r=i(4848),o=i(7581),n=i(519),s=i(7594);const a=o.Ay.button`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;

  border-radius: 0.5rem;

  transition: background-color 0.2s ease-in-out;

  cursor: pointer;

  ${({$size:e})=>o.AH`
    ${(()=>{switch(e){case"sm":return o.AH`
            width: ${s.w.iconButtonSize.sm};
            min-width: ${s.w.iconButtonSize.sm};
          `;case"md":return o.AH`
            width: ${s.w.iconButtonSize.md};
            min-width: ${s.w.iconButtonSize.md};
          `;case"lg":return o.AH`
            width: ${s.w.iconButtonSize.lg};
            min-width: ${s.w.iconButtonSize.lg};
          `;case"xl":return o.AH`
            width: ${s.w.iconButtonSize.xl};
            min-width: ${s.w.iconButtonSize.xl};
          `;default:return o.AH`
            width: calc(${e} + 1rem);
            min-width: calc(${e} + 1rem);
          `}})()}
  `}

  ${({$backgroundColor:e})=>(({$backgroundColor:e})=>{const{base:t,hover:i,active:r}=(0,n.w)(e,!0);return o.AH`
    &:not(:disabled) {
      ${t}
      &:hover {
        ${i}
      }

      &:active {
        ${r}
      }
    }
  `})({$backgroundColor:e})}

  ${({$css:e})=>e}

  svg {
    ${({$size:e})=>o.AH`
    ${()=>{switch(e){case"sm":return o.AH`
            width: ${s.w.iconSize.sm};
            height: ${s.w.iconSize.sm};
          `;case"md":return o.AH`
            width: ${s.w.iconSize.md};
            height: ${s.w.iconSize.md};
          `;case"lg":return o.AH`
            width: ${s.w.iconSize.lg};
            height: ${s.w.iconSize.lg};
          `;case"xl":return o.AH`
            width: ${s.w.iconSize.xl};
            height: ${s.w.iconSize.xl};
          `;default:return o.AH`
            width: ${e};
            height: ${e};
          `}}}
  `}
    color: ${({$color:e})=>e};
  }

  &:disabled {
    background-color: transparent;

    cursor: default;

    svg {
      color: ${s.w.color.black[400]};
    }
  }
`,l=({$css:e,icon:t,size:i="md",color:o="#000000",backgroundColor:n="#FFFFFF",disabled:s=!1,...l})=>(0,r.jsx)(a,{$css:e,$size:i,$color:o,$backgroundColor:n,disabled:s,...l,children:t})},2947:(e,t,i)=>{i.d(t,{A:()=>m});var r=i(4848),o=i(9879),n=i(7594),s=i(7581);const a={DEFAULT:s.AH`
    border: 1px solid ${({theme:e})=>e.color.black[300]};

    background-color: ${({theme:e})=>e.color.black[0]};
  `,ERROR:s.AH`
    border: 1px solid ${({theme:e})=>e.color.danger[500]};

    background-color: ${({theme:e})=>e.color.danger[10]};
  `,SUCCESS:s.AH`
    border: 1px solid ${({theme:e})=>e.color.success[500]};

    background-color: ${({theme:e})=>e.color.success[10]};
  `},l=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  ${({$status:e})=>a[e]};
  width: ${({$width:e})=>e};
  height: ${({$height:e})=>e};
  padding: 0 1.4rem;
  border-radius: ${({$borderRadius:e})=>e};

  font-size: ${({theme:e})=>e.fontSize.md};

  &:focus-within {
    border: 1px solid ${({$color:e})=>e};

    background-color: ${({theme:e})=>e.color.black[0]};
  }

  &:disabled {
    border: 1px solid ${({theme:e})=>e.color.black[300]};

    background-color: ${({theme:e})=>e.color.black[50]};
  }
  ${({$css:e})=>e}
`,c=s.Ay.input`
  width: 100%;
  height: 100%;

  &::placeholder {
    color: ${({theme:e})=>e.color.black[300]};
  }
`,d=s.Ay.button`
  display: flex;
  align-items: center;

  cursor: pointer;

  svg {
    color: ${({theme:e})=>e.color.black[300]};

    transition: 0.2s all ease;

    &:hover {
      color: ${({theme:e})=>e.color.black[400]};
    }
  }
`,m=({width:e="100%",status:t="DEFAULT",height:i="4.8rem",borderRadius:s="1rem",color:a="PRIMARY",value:m,onReset:h,$css:u,...p})=>(0,r.jsxs)(l,{$status:t,$width:e,$height:i,$borderRadius:s,$color:"PRIMARY"===a?n.w.color.primary[800]:n.w.color.secondary[700],$css:u,children:[(0,r.jsx)(c,{value:m,...p}),h&&(0,r.jsx)(d,{onClick:h,children:(0,r.jsx)(o.m6K,{size:"1.6rem"})})]})},7545:(e,t,i)=>{i.d(t,{F:()=>u});var r=i(4848),o=i(7581);const n=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({$gap:e})=>e};

  width: 100%;
`;var s=i(2947),a=i(7594);const l=o.Ay.label`
  color: ${({$color:e})=>e};
  font-size: ${({$fontSize:e})=>e};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,c=o.Ay.div`
  display: flex;
  gap: 1rem;
`,d={DEFAULT:o.AH`
    color: ${({theme:e})=>e.color.black[600]};
  `,ERROR:o.AH`
    color: ${({theme:e})=>e.color.danger[600]};
  `,SUCCESS:o.AH`
    color: ${({theme:e})=>e.color.success[700]};
  `},m=o.Ay.p`
  ${({$status:e})=>d[e]};
  font-size: ${({$fontSize:e})=>e};

  ${({$css:e})=>e}
`,h=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: ${({$gap:e})=>e};

  width: ${({$width:e})=>e};
  height: ${({$height:e})=>e};
`,u=Object.assign((({width:e="100%",height:t="100%",gap:i="0.8rem",children:o})=>(0,r.jsx)(h,{$height:t,$width:e,$gap:i,children:o})),{Label:({color:e=a.w.color.primary[800],fontSize:t=a.w.fontSize.base,children:i,...o})=>(0,r.jsx)(c,{children:(0,r.jsx)(l,{$color:e,$fontSize:t,...o,children:i})}),Input:s.A,Message:({$css:e,status:t="DEFAULT",fontSize:i=a.w.fontSize.sm,children:o})=>(0,r.jsx)(m,{role:"alert","aria-live":"assertive","aria-atomic":"true",$status:t,$css:e,$fontSize:i,children:o}),Content:({gap:e="1rem",children:t})=>(0,r.jsx)(n,{$gap:e,children:t})})},7351:(e,t,i)=>{i.d(t,{a:()=>R});var r=i(4848),o=i(7581);const n=o.Ay.div`
  overflow-y: auto;

  margin: 4rem 0;

  font-size: ${({theme:e})=>e.fontSize.base};
  line-height: 1.5;
`;var s=i(9879),a=i(6872),l=i(7594);const c=o.AH`
  position: absolute;
  top: 3.5rem;
  right: 3.5rem;
`,d={LEFT:"start",CENTER:"center",RIGHT:"end"},m=o.Ay.div`
  display: flex;
  flex-direction: ${({$direction:e})=>e};
  justify-content: ${({$direction:e,$position:t})=>"ROW"===e&&d[t]};
  align-items: ${({$direction:e,$position:t})=>"COLUMN"===e&&d[t]};
  gap: 1.6rem;
`,h=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,u=o.Ay.h2`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.h3};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,p=o.Ay.p`
  color: ${({theme:e})=>e.color.primary[700]};
  font-size: ${({theme:e})=>e.fontSize.h6};
`;var f=i(961),g=i(6540);var x=i(1983);const y=o.i7`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,b=o.i7`
  from {
    transform: translateY(-0.2rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`,$=o.i7`
  from {
    transform: translateY(0.2rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`,v=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: ${({$position:e})=>"BOTTOM"===e?"flex-end":"center"};

  position: fixed;
  top: 0;
  z-index: ${x.M.MODAL};

  width: 100%;
  height: 100%;

  animation: ${y} 0.3s ease;
`,w={OPAQUE:o.AH`
    background: ${({theme:e})=>e.color.black[900]};
    opacity: 0.36;
  `,BLUR:o.AH`
    background: #00000080;
    backdrop-filter: blur(10px);
  `,TRANSPARENT:o.AH`
    background: transparent;
  `},j=o.Ay.div`
  position: fixed;
  top: 0;

  width: 100%;
  height: 100%;
  ${({$backdropType:e})=>w[e]}
`,A={sm:"30%",md:"60%",lg:"90%"},S={BOTTOM:o.AH`
    max-height: 90vh;
    margin: 0;
    border-radius: 2rem 2rem 0 0;
  `,CENTER:o.AH`
    max-height: 70vh;
    margin: 0 3rem;
    border-radius: 2rem;
  `},E={BOTTOM:o.AH`
    animation: ${b} 0.3s ease-in forwards;
  `,CENTER:o.AH`
    animation: ${$} 0.3s ease-in forwards;
  `},k=o.Ay.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: ${({$size:e})=>A[e]??e};
  height: ${({$height:e})=>e&&e};
  padding: 4rem;

  background: ${({theme:e})=>e.color.black[0]};
  box-shadow: ${({$shadow:e})=>e&&" 0 3px 6px rgb(0 0 0 / 10%),\n    0 3px 6px rgb(0 0 0 / 10%)"};

  ${({$position:e})=>S[e]}
  ${({$position:e,$animation:t})=>t&&E[e]}
`,R=Object.assign((({isOpen:e,close:t,size:i="md",height:o="",position:n="CENTER",shadow:s=!0,animation:a=!0,backdropType:l="OPAQUE",children:c})=>{const d=(e=>{const t=(0,g.useRef)(null),i=(0,g.useRef)([]);return(0,g.useEffect)((()=>{if(!e||!t.current)return;if(i.current=Array.from(t.current.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled], textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')),0===i.current.length)return;const r=e=>{if("Tab"===e.key){e.preventDefault();const t=i.current.findIndex((e=>e===document.activeElement)),r=e.shiftKey?(e=>0===e?i.current.length-1:e-1)(t):(e=>e===i.current.length-1?0:e+1)(t);i.current[r].focus()}};return document.addEventListener("keydown",r),()=>document.removeEventListener("keydown",r)}),[e,t]),t})(e);return((e,t)=>{(0,g.useEffect)((()=>{const i=document.getElementById(t);if(i)return e?i.setAttribute("aria-hidden","true"):i.removeAttribute("aria-hidden"),()=>i.removeAttribute("aria-hidden")}),[e])})(e,"root"),((e,t)=>{(0,g.useEffect)((()=>{if(!e)return;const i=e=>{"Escape"===e.key&&t()};return document.addEventListener("keydown",i,!0),()=>document.removeEventListener("keydown",i,!0)}),[e,t])})(e,t),(e=>{(0,g.useEffect)((()=>{if(!e)return;const t=(()=>{const e=window.scrollY;return document.body.style.position="fixed",document.body.style.width="100%",document.body.style.top=`-${e}px`,document.body.style.overflowY="auto",e})();return()=>(e=>{document.body.style.position="",document.body.style.width="",document.body.style.top="",document.body.style.overflowY="",window.scrollTo(0,e)})(t)}),[e])})(e),e?(0,f.createPortal)((0,r.jsxs)(v,{ref:d,$position:n,role:"presentation",children:[(0,r.jsx)(j,{onClick:t,$backdropType:l}),(0,r.jsx)(k,{$size:i,$height:o,$position:n,$shadow:s,$animation:a,children:c})]}),document.body):null}),{CloseButton:({close:e})=>(0,r.jsx)(a.A,{$css:c,icon:(0,r.jsx)(s.m6K,{}),color:l.w.color.black[600],size:"xl",onClick:e,"aria-label":"모달 닫기"}),Header:({title:e,subTitle:t,children:i})=>(0,r.jsxs)(h,{role:"presentation",children:[(0,r.jsx)(u,{children:e}),t&&(0,r.jsx)(p,{children:t}),i]}),Body:({children:e})=>(0,r.jsx)(n,{children:e}),Footer:({direction:e="ROW",position:t="RIGHT",children:i})=>(0,r.jsx)(m,{$direction:e,$position:t,children:i})})},131:(e,t,i)=>{i.d(t,{A:()=>m});var r=i(4848),o=i(7581);const n=o.i7`
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`,s={sm:"4rem",md:"8rem",lg:"12rem",xl:"16rem"},a=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  height: fit-content;
`,l=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  min-width: ${({$size:e})=>s[e]};
  min-height: ${({$size:e})=>s[e]};
`,c=o.Ay.div`
  position: absolute;

  width: ${({$size:e})=>s[e]};
  margin: auto;
  border-radius: 50%;

  background-color: ${({theme:e,$color:t})=>e.color[t][700]};
  opacity: 0.6;

  animation: ${n} 2s infinite ease-in-out;

  aspect-ratio: 1;
`,d=o.Ay.div`
  position: absolute;

  width: ${({$size:e})=>s[e]};
  margin: auto;
  border-radius: 50%;

  background-color: ${({theme:e,$color:t})=>e.color[t][700]};
  opacity: 0.6;

  animation: ${n} 2s infinite ease-in-out;

  aspect-ratio: 1;
  animation-delay: -1s;
`,m=({size:e="md",color:t="primary"})=>(0,r.jsx)(a,{children:(0,r.jsxs)(l,{$size:e,children:[(0,r.jsx)(c,{$size:e,$color:t}),(0,r.jsx)(d,{$size:e,$color:t})]})})},3413:(e,t,i)=>{i.d(t,{U:()=>r});const r={GET_REFERENCE_LINKS:"레퍼런스 링크를 불러오지 못했습니다. 다시 시도해 주세요.",ADD_REFERENCE_LINKS:"레퍼런스 링크를 저장하지 못했습니다. 다시 시도해 주세요.",DELETE_REFERENCE_LINKS:"레퍼런스 링크 삭제에 실패했습니다. 다시 시도해 주세요.",GET_PAIR_ROOM:"페어룸 정보를 불러오지 못했습니다. 다시 시도해 주세요.",DELETE_PAIR_ROOM:"페어룸 삭제에 실패했습니다. 다시 시도해 주세요.",ADD_PAIR_NAMES:"페어룸 생성에 실패했습니다. 다시 시도해 주세요.",GET_TODOS:"투두 리스트를 불러오지 못했습니다. 다시 시도해 주세요.",ADD_TODO:"투두 아이템을 저장하지 못했습니다. 다시 시도해 주세요.",UPDATE_TODO:"투두 아이템을 수정하지 못했습니다. 다시 시도해 주세요.",DELETE_TODO:"투두 아이템을 삭제하지 못했습니다. 다시 시도해 주세요.",GET_CATEGORIES:"카테고리 정보를 가져오지 못했습니다. 다시 시도해 주세요.",ADD_CATEGORY:"카테고리를 추가하지 못했습니다. 다시 시도해 주세요.",SIGN_IN:"로그인에 실패했습니다. 다시 시도해 주세요.",SIGN_UP:"회원가입에 실패했습니다. 다시 시도해 주세요.",SIGN_OUT:"로그아웃에 실패했습니다. 다시 시도해 주세요.",CHECK_USER_LOGIN:"로그인 여부를 확인하지 못했습니다. 다시 시도해 주세요.",GET_MEMBER:"회원 정보를 가져오지 못했습니다. 다시 시도해 주세요.",DELETE_MEMBER:"회원 탈퇴에 실패했습니다. 다시 시도해 주세요.",ADD_RETROSPECT:"회고를 작성하지 못했어요. 다시 시도해 주세요.",GET_RETROSPECT:"회고 내용을 불러오지 못했어요. 새로고침 해 주세요.",UPDATE_PAIR_ROOM_STATUS:"페어 프로그래밍을 완료하는 데 실패했습니다. 다시 시도해 주세요.",GET_USER_IS_IN_PAIR_ROOM:"페어룸 참여 여부를 확인하지 못했습니다. 다시 시도해 주세요.",GET_USER_RETROSPECTS:"회고 정보를 가져오지 못했습니다. 다시 시도해 주세요.",GET_USER_RETROSPECT_EXISTS:"회고 작성 여부를 확인하지 못했습니다. 다시 시도해 주세요.",DELETE_RETROSPECT:"회고를 삭제하지 못했어요"}},5778:(e,t,i)=>{i.d(t,{e:()=>r});const r={GET_REFERENCE_LINKS:"getReferenceLinks",GET_PAIR_ROOM:"getPairRoom",GET_PAIR_ROOM_TIMER:"getPairRoomTimer",GET_PAIR_ROOM_HISTORY:"getPairRoomHistory",GET_MY_PAIR_ROOMS:"getMyPairRooms",GET_MEMBER_NAME:"getMemberName",GET_REPOSITORIES:"getRepositories",GET_BRANCHES:"getBranches",GET_CATEGORIES:"getCategories",GET_SIGN_IN:"getSignIn",GET_SIGN_OUT:"getSignOut",GET_TODOS:"getTodos",GET_RETROSPECT_ANSWER:"getRetrospectAnswer",GET_USER_IS_IN_PAIR_ROOM:"getUserIsInPairRoom",GET_USER_RETROSPECT_EXISTS:"getUserRetrospectExists",GET_MY_RETROSPECTS:"getUserRetrospects"}},1983:(e,t,i)=>{i.d(t,{M:()=>r});const r={MINUS:-1,PLUS:1,DROPDOWN:99,HEADER:100,TOOLTIP:999,MODAL:9998,TOAST:9999}},2657:(e,t,i)=>{i.d(t,{A:()=>o});var r=i(6540);const o=(e,t)=>{const[i,o]=(0,r.useState)("");(0,r.useEffect)((()=>{const e=document.querySelector("title");e&&(e.innerHTML=`${i} 코딩해듀오`)}),[i]),(0,r.useEffect)((()=>{if(!e||!t)return o("");o(`${e}:${t} -`)}),[e,t])}},656:(e,t,i)=>{i.d(t,{A:()=>o});var r=i(6540);const o=e=>{const t=(0,r.useRef)(null);return(0,r.useEffect)((()=>{if(!e)return;const i=e=>{"Enter"===e.key&&t.current&&t.current.click()};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)}),[e]),{buttonRef:t}}},1066:(e,t,i)=>{i.d(t,{A:()=>o});var r=i(6540);const o=(e,t)=>{(0,r.useEffect)((()=>{const i=i=>{e.current&&!e.current.contains(i.target)&&t()};return document.addEventListener("mousedown",i),()=>{document.removeEventListener("mousedown",i)}}),[e,t])}},4998:(e,t,i)=>{i.d(t,{A:()=>n});var r=i(6540),o=i(1711);const n=()=>{const[e,t]=(0,r.useState)(!1),{addToast:i}=(0,o.A)();return[e,async e=>{try{await navigator.clipboard.writeText(e),t(!0),i({status:"SUCCESS",message:"클립보드에 복사되었습니다."})}catch(e){t(!1),i({status:"ERROR",message:"클립보드에 복사에 실패했습니다."})}}]}},3847:(e,t,i)=>{i.d(t,{A:()=>o});var r=i(6540);const o=(e="")=>{const[t,i]=(0,r.useState)(e),[o,n]=(0,r.useState)("DEFAULT"),[s,a]=(0,r.useState)("");return{value:t,status:o,message:s,handleChange:(e,t)=>{if(t){const{status:e,message:i}=t;n(e),a(i)}i(e.target.value)},resetValue:()=>{i(e),n("DEFAULT"),a("")}}}},2298:(e,t,i)=>{i.d(t,{A:()=>o});var r=i(6540);const o=(e=!1)=>{const[t,i]=(0,r.useState)(e);return{isModalOpen:t,openModal:()=>i(!0),closeModal:()=>i(!1),modalToggle:()=>i(!t)}}},8215:(e,t,i)=>{var r=i(4848),o=i(6540),n=(i(9970),i(9145)),s=i(4858),a=i(9906),l=i(5338),c=i(4976),d=i(5072),m=i(7665),h=i(7581),u=i(7767),p=i(131),f=i(4703),g=i(6915),x=i(3413);const y=async()=>(await g.A.get({url:"undefined/member",errorMessage:x.U.GET_MEMBER})).json(),b=async e=>(await g.A.get({url:`undefined/member/exists?user_id=${e}`,errorMessage:x.U.GET_MEMBER})).json(),$=async()=>{await g.A.delete({url:"undefined/member",errorMessage:x.U.DELETE_MEMBER})},v=async()=>(await g.A.get({url:"undefined/my-pair-rooms",errorMessage:x.U.GET_MEMBER})).json(),w=async()=>{const e=await g.A.get({url:"undefined/retrospects",errorMessage:x.U.GET_USER_RETROSPECTS});return await e.json()},j=h.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  height: calc(100vh - 7rem);
  padding: 20px;

  background-color: ${({theme:e})=>e.color.black[50]};
`,A=h.Ay.h1`
  margin-bottom: 2rem;

  color: ${({theme:e})=>e.color.primary[900]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.light};
`,S=()=>{const e=(0,u.Zp)(),{setUser:t}=(0,f.A)();return(0,o.useEffect)((()=>{(async()=>{const{signedUp:i}=await(async()=>{const e=await g.A.get({url:"undefined/sign-in/callback",errorMessage:x.U.SIGN_IN});return await e.json()})();if(i){const{username:i}=await y();return t(i,"SIGNED_IN"),void e("/main")}e("/sign-up")})()}),[]),(0,r.jsxs)(j,{children:[(0,r.jsx)(A,{children:"로그인 중입니다. 잠시만 기다려 주세요 😊"}),(0,r.jsx)(p.A,{size:"md"})]})},E=h.Ay.p`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};

  @media (width <= 1400px) {
    font-size: ${({theme:e})=>e.fontSize.base};
  }
`,k=h.Ay.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  position: relative;

  padding-left: 15px;

  @media (width <= 1400px) {
    gap: 0.8rem;
  }
`,R=(0,h.Ay)(c.N_)`
  position: relative;

  color: ${({$isActive:e,theme:t})=>e?t.color.black[900]:t.color.black[300]};
  font-size: ${({theme:e})=>e.fontSize.base};
  text-decoration: none;

  transition: all 0.1s;

  &::before {
    position: absolute;
    top: -0.4rem;
    left: -2rem;

    width: 3px;
    height: 160%;

    background-color: ${({$isActive:e,theme:t})=>e?t.color.secondary[500]:t.color.black[200]};

    transition: all 0.2s;
    content: '';
  }

  @media (width <= 1400px) {
    font-size: ${({theme:e})=>e.fontSize.md};
  }
`,z=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;

  @media (width <= 1400px) {
    gap: 0.9rem;
  }
`,O=({title:e,contents:t,activeSection:i})=>{const o=(0,u.Zp)();return(0,r.jsxs)(z,{children:[(0,r.jsx)(E,{children:e}),(0,r.jsx)(k,{children:t.map((e=>(0,r.jsx)(R,{onClick:()=>o(`#${e.id}`),to:`#${e.id}`,$isActive:e.id===i,children:e.subtitle},e.id)))})]})},T=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2.3rem;

  position: fixed;
  top: 12rem;
  left: 4%;

  background-color: ${({theme:e})=>e.color.black[0]};

  @media (width <= 1400px) {
    gap: 1.8rem;

    top: 12rem;
    left: 4%;

    padding: 2rem;
  }

  @media (width <= 1000px) {
    display: none;
  }
`,C=({children:e})=>(0,r.jsx)(T,{children:e}),_=h.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  text-decoration: none;
`,I=h.Ay.span`
  color: ${({theme:e})=>e.color.black[200]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.extraBold};
`,N=h.Ay.p`
  color: ${({theme:e})=>e.color.black[900]};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.extraLight};
`,M=h.Ay.a`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
  text-decoration: underline;

  transition: color 0.2s ease;

  &:hover {
    color: ${({theme:e})=>e.color.primary[900]};
  }
`,F=({text:e,href:t,linkText:i,isNewBrowserOpen:o=!0})=>(0,r.jsxs)(_,{children:[(0,r.jsx)(I,{children:"|"}),(0,r.jsx)(N,{children:e}),t&&i&&(0,r.jsx)(M,{href:t,target:o?"_blank":"",children:i})]});var P=i(4998),D=i(5238);const U=h.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  position: relative;

  padding: 3rem 4rem;
  border-radius: 0.5rem;

  background-color: ${({theme:e})=>e.color.black[800]};
`,G=h.Ay.p`
  color: ${({theme:e})=>e.color.black[100]};
  font-size: ${({theme:e})=>e.fontSize.base};
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
`,W=(0,h.Ay)(D.$6X)`
  position: absolute;
  top: 1rem;
  right: 1rem;

  color: ${({theme:e})=>e.color.black[300]};
  font-size: 2rem;

  cursor: pointer;

  &:hover {
    color: ${({theme:e})=>e.color.black[400]};

    transform: scale(1.03);
  }

  &:active {
    color: ${({theme:e})=>e.color.black[700]};

    transform: scale(1.06);
  }
`,L=({code:e})=>{const[,t]=(0,P.A)();return(0,r.jsxs)(U,{children:[(0,r.jsx)(G,{children:e}),(0,r.jsx)(W,{onClick:()=>t(e)})]})},H=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin-top: 3rem;
`,B=h.Ay.p`
  color: ${({theme:e})=>e.color.black[900]};
  font-size: ${({theme:e})=>e.fontSize.lg};
`,q=h.Ay.img`
  width: 80rem;

  object-fit: cover;
  object-position: center;

  @media (width <= 1000px) {
    width: 60rem;
  }
`,Y=({steps:e})=>(0,r.jsx)(r.Fragment,{children:e?.map(((e,t)=>(0,r.jsxs)(H,{id:e.id,children:[e.title&&(0,r.jsx)(B,{children:e.title}),e.info&&(0,r.jsx)(F,{text:e.info}),e.src&&(0,r.jsx)(q,{src:e.src,alt:e.id}),e.sourceCode?.map(((e,t)=>(0,r.jsx)(L,{code:e},t)))]},t)))}),K=[{id:"coduo-guide",title:"코딩해듀오 가이드북",content:"코딩해듀오 가이드북에 오신 것을 환영합니다! \n            코딩해듀오는 페어 프로그래밍을 처음 접하는 사용자가 페어프로그래밍을 시작하기 위해 필요한 모든 것을 제공하는 서비스입니다. \n            여기에서는 코딩해듀오를 어떻게 시작할 수 있는지 소개합니다.",steps:[{title:"1. 방 생성하기",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855075/coduo-start.webp",alt:"create-room",info:"가장 먼저 방을 생성해주세요. 방 만들기 버튼을 누르면 페어 프로그래밍을 진행할 방이 생성됩니다"}]},{id:"start-mission",subtitle:"미션과 함께 시작하기",content:"코딩해듀오는 원활한 페어 프로그래밍 진행을 위해 연습 미션을 제공하고 있습니다.",quote:{href:"https://github.com/coduo-missions",linkText:"미션 레포지토리로 이동",text:"미션 레포지토리에서 미션을 미리 확인해 보세요."},steps:[{title:"1. 미션과 함께 시작하기",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855172/start-with-mission.webp",id:"start-with-mission"},{title:"2. 미션 확인하기",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855172/select-mission.webp",id:"select-mission",info:"레포지토리로 이동 버튼을 클릭하면 해당하는 미션의 레포지토리로 이동합니다. 확인 후 원하는 미션 버튼을 클릭해주세요."},{title:"3. 브랜치 생성하기",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855171/create-branch.webp",id:"create-branch",info:"미션 버튼 클릭 시 브랜치 이름을 입력 할 수 있습니다. 자신의 깃허브 ID로 브랜치 이름을 입력하고 브랜치 생성하기 버튼을 클릭해주세요."},{title:"4. 생성한 브랜치 확인하기",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855171/check-branch.webp",id:"check-branch-created",info:"미션 레포지토리에서 자신의 브랜치가 생성되었는지 확인해주세요."},{title:"5. fork 하기",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734858436/create-fork.png",id:"fork-repository",info:"상단의 fork 버튼을 눌러 해당 미션을 자신의 레포지토리로 fork 해주세요."},{title:"6. 레포지토리 주소 복사하기",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734855171/copy-code.webp",id:"copy-repository-address",info:"fork 해 온 레포지토리 주소를 복사해주세요."},{title:"7. 로컬에 clone 하기",id:"clone-in-local",info:"\n        cd 명령어를 통해 원하는 폴더로 이동 후 레포지토리를 clone하고, 본인이 사용하는 통합 개발 환경(IDE)으로 열어 미션을 시작합니다.",sourceCode:[" cd {이동할 폴더 이름}","git clone {복사한 레포지토리 주소}"," code {실행할 파일 이름}"]}]},{id:"start-free",subtitle:"자유롭게 시작하기",steps:[{title:"1. 미션 없이 시작하기",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/start-free.webp",id:"start-without-mission",info:"'그냥 시작할래요' 버튼을 누르면 미션 없이 자유롭게 시작할 수 있습니다."},{title:"2. 이름 입력하기 ",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/link-pair.webp",id:"input-pair-name",info:"사용할 이름을 입력해 줍니다. 페어 정보 연동하기 버튼을 누르면 코딩해듀오에 가입 되어 있는 페어의 아이디를 연동할 수 있습니다."},{src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/input-pair-name.webp",id:"input-pair-name",info:"연동 없이 시작할 경우, 사용할 페어 이름을 입력해 줍니다."},{title:"3. 역할 정하기",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734868518/select-role.webp",id:"select-role",info:"페어와 논의하여 드라이버와 내비게이터를 정해줍니다. 관련 내용은 설명을 참고해 주세요."},{title:"4. 타이머 설정하기",id:"set-timer",src:"https://res.cloudinary.com/dtxv2v5kx/image/upload/v1734869420/set-timer.webp",info:'페어프로그래밍을 진행 할 시간을 정해주세요. 버튼을 클릭하거나 "직접 설정"을 통해 자유롭게 정할 수 있습니다.'}]}],V=[{id:"start-with-mission",subtitle:"미션과 함께 시작하기"},{id:"select-mission",subtitle:"미션 확인하기"},{id:"create-branch",subtitle:"브랜치 생성하기"},{id:"check-branch-created",subtitle:"생성한 브랜치 확인하기"},{id:"fork-repository",subtitle:"fork 하기"},{id:"copy-repository-address",subtitle:"레포지토리 주소 복사하기"},{id:"clone-in-local",subtitle:"로컬에 clone 하기"}],X=[{id:"start-free",subtitle:"미션 없이 시작하기"},{id:"input-pair-name",subtitle:"이름 입력하기"},{id:"select-role",subtitle:"역할 정하기"},{id:"set-timer",subtitle:"타이머 설정하기"}],Z=[{id:"what-is-pair-programming",subtitle:"페어 프로그래밍이란?"},{id:"what-is-pair-room",subtitle:"페어룸이란?"}],J=[{id:"what-is-pair-programming",title:"페어 프로그래밍에 대해",subtitle:"페어 프로그래밍이란?",quote:{text:"페어 프로그래밍에 대한 정보는 다음 레퍼런스를 기반으로 작성했습니다.",linkText:"자세한 정보 보기",href:"https://www.techtarget.com/searchsoftwarequality/definition/Pair-programming"},content:"페어 프로그래밍(Pair Programming)은 두 명의 프로그래머가 한 컴퓨터에서 함께 작업하며 소프트웨어 코드를 작성하는 협업 방식입니다. 페어 프로그래밍에서는 두 사람이 각각 드라이버(Driver) 와 내비게이터(Navigator) 역할을 번갈아 가며 수행합니다.",code:"드라이버(Driver)\n실제로 코드를 작성하는 사람으로, 키보드와 마우스를 사용해 코드를 타이핑합니다.\n        \n내비게이터(Navigator)\n작성된 코드를 실시간으로 검토하고 개선할 부분을 제안하며, 코드의 전반적인 구조와 논리를 생각합니다."}],Q=[{quote:"페어 프로그래밍을 효과적으로 수행하려면 다음과 같은 부분들을 유의해야 합니다."},{strong:"지속적인 의사소통 유지하기",info:"페어 프로그래밍의 핵심은 지속적인 의사소통입니다. 만약 두 개발자 사이에 대화가 없다면, 그들은 아마도 사고 과정을 공유하고 있지 않을 것입니다. 드라이버는 코드를 작성하면서 자신의 생각을 말로 표현해야 하며, 내비게이터는 적극적으로 의견을 제시하고 질문해야 합니다. 이를 통해 아이디어를 효과적으로 교환하고 문제를 함께 해결할 수 있습니다."},{strong:"역할 정기적으로 교대하기와 코드 자주 커밋하기",info:"드라이버와 내비게이터 역할을 일정 간격으로 바꾸는 것이 중요합니다. 이는 개발자 간의 기술 공유를 촉진하고 집중력을 유지하는 데 도움이 됩니다. 역할을 전환할 때마다 코드를 커밋하는 것이 좋습니다. 작은 단위로 자주 커밋하면 작업 진행 상황을 명확히 할 수 있고, 나중에 코드를 리뷰하거나 문제를 해결할 때 유용합니다."},{strong:"적절한 페어 구성과 익숙한 개발 환경 사용하기",info:"페어를 이룰 때는 두 개발자가 원활하게 협력할 수 있는지 신중히 고려해야 합니다. 성격이나 작업 스타일이 맞지 않으면 생산성이 떨어질 수 있습니다. 또한, 두 개발자 모두 사용하는 개발 환경에 익숙해야 합니다. 그렇지 않으면 페어 프로그래밍의 균형이 깨질 수 있습니다. 필요한 경우, 시작 전에 개발 환경을 함께 설정하고 익히는 시간을 가지는 것이 좋습니다."},{strong:"필요할 때 명확히 설명 요청하기와 적절한 휴식 취하기",info:"특히 경험이 적은 개발자가 전문가와 작업할 때는 배울 수 있는 모든 기회를 활용해야 합니다. 이해가 되지 않는 부분이 있다면 주저하지 말고 설명을 요청해야 합니다. 동시에, 두 개발자 모두에게 적합한 페이스로 작업해야 합니다. 필요할 때는 휴식을 취하여 집중력을 유지하고 생산성을 높일 수 있습니다. 정기적인 휴식은 장기적으로 더 효율적인 작업을 가능하게 합니다."}],ee=[{subtitle:"페어룸이란?",id:"what-is-pair-room"},{quote:"코딩해듀오에서는 페어룸을 제공하여 페어 프로그래밍을 더욱 유용하고 쉽게 하도록 도와줍니다."},{strong:"투두 리스트",info:"투두 리스트를 제공하여, 페어가 함께 목표와 할 일을 설정하고 관리할 수 있습니다. 이를 통해 작업의 방향성을 명확히 하고 진행 상황을 실시간으로 파악할 수 있습니다. 또한, 우선순위를 설정하여 중요한 작업에 집중할 수 있으며, 완료된 작업을 체크하면서 성취감을 느낄 수 있습니다."},{strong:"레퍼런스",info:"페어 프로그래밍 도중 참고한 레퍼런스를 저장할 수 있습니다. 저장된 레퍼런스는 카테고리별로 정리되어 나중에 쉽게 찾아볼 수 있어 프로젝트 완료 후에도 학습 자료로 활용할 수 있습니다."},{strong:"알람 기능",info:"설정한 시간이 지나면 역할을 변경할 수 있도록 알람이 울려 적절한 시점에 역할을 교체할 수 있도록 돕습니다."},{strong:"회고",info:"페어 프로그래밍 세션이 종료되면 회고를 진행합니다. 이 과정에서 잘된 점, 개선할 점, 배운 점 등을 함께 논의하고 기록합니다. 회고 기능은 구조화된 템플릿을 제공하여 효과적인 회고를 가능하게 하며, 이전 회고 내용을 쉽게 참조할 수 있어 지속적인 개선이 가능합니다."}],te=h.Ay.p`
  margin-top: 5rem;

  color: ${({theme:e})=>e.color.black[900]};
  font-size: ${({theme:e})=>e.fontSize.h2};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,ie=h.Ay.p`
  margin-top: 3rem;

  color: ${({theme:e})=>e.color.black[900]};
  font-size: ${({theme:e})=>e.fontSize.h4};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,re=h.Ay.p`
  gap: 1rem;

  color: ${({theme:e})=>e.color.black[900]};
  font-size: ${({theme:e})=>e.fontSize.base};
  line-height: 1.9;
`,oe=h.Ay.strong`
  color: ${({theme:e})=>e.color.primary[800]};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,ne=(h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`,h.Ay.section`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`),se=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  margin: 5% 10% 8% 25%;

  @media (width <= 1000px) {
    margin: 8% 17%;
  }
`,ae=()=>{const{activeSection:e}=(()=>{const e=(0,u.zy)(),t=e.hash.replace("#",""),[i,r]=(0,o.useState)(t),n=(0,o.useRef)(!1);return(0,o.useEffect)((()=>{const e=()=>{n.current||(requestAnimationFrame((()=>{const e=Array.from(document.querySelectorAll("section[id], div[id], p[id]")),t=window.innerHeight,o=e.find((e=>{const i=e.getBoundingClientRect();return i.top>=0&&i.top<=t}));var s;o&&o.id!==i&&(s=o.id,r(s)),n.current=!1})),n.current=!0)};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}}),[i]),(0,o.useEffect)((()=>{if(e.hash){const e=document.getElementById(t);if(e){const t=70,i=50,r=e.getBoundingClientRect().top+window.scrollY-t-i;window.scrollTo({top:r,behavior:"smooth"})}}}),[e,t]),{activeSection:i}})();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(C,{children:[(0,r.jsx)(O,{activeSection:e,title:"미션과 함께 시작하기",contents:V}),(0,r.jsx)(O,{activeSection:e,title:"자유롭게 시작하기",contents:X}),(0,r.jsx)(O,{activeSection:e,title:"페어 프로그래밍에 대해",contents:Z})]}),(0,r.jsxs)(se,{children:[K.map(((e,t)=>(0,r.jsxs)(ne,{"aria-labelledby":e.id,children:[e.title&&(0,r.jsx)(te,{id:e.id,children:e.title}),e.subtitle&&(0,r.jsx)(ie,{id:e.id,children:e.subtitle}),e.content&&(0,r.jsx)(re,{children:e.content}),e.quote&&(0,r.jsx)(F,{...e.quote}),e.steps&&(0,r.jsx)(Y,{steps:e.steps})]},t))),J.map(((e,t)=>(0,r.jsxs)(ne,{"aria-labelledby":e.id,children:[e.title&&(0,r.jsx)(te,{id:e.id,children:e.title}),e.subtitle&&(0,r.jsx)(ie,{id:e.id,children:e.subtitle}),e.quote&&(0,r.jsx)(F,{...e.quote}),e.content&&(0,r.jsx)(re,{children:e.content}),e.code&&(0,r.jsx)(L,{code:e.code})]},t))),(0,r.jsx)(ne,{children:Q.map(((e,t)=>(0,r.jsxs)(re,{children:[e.quote&&(0,r.jsx)(F,{text:e.quote}),e.strong&&(0,r.jsx)(oe,{children:e.strong}),e.info&&(0,r.jsx)("p",{children:e.info})]},t)))}),(0,r.jsx)(ne,{children:ee.map(((e,t)=>(0,r.jsxs)(re,{children:[e.subtitle&&(0,r.jsx)(ie,{id:e.id,children:e.subtitle}),e.quote&&(0,r.jsx)(F,{text:e.quote}),e.strong&&(0,r.jsx)(oe,{children:e.strong}),e.info&&(0,r.jsx)("p",{children:e.info})]},t)))})]})]})};var le=i(6638),ce=i(7418),de=i(7351),me=i(1711);const he=h.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  width: 100%;
`,ue=h.Ay.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;

  img {
    width: 2rem;
    height: 2rem;
  }
`,pe=h.Ay.li`
  display: flex;
  align-items: center;

  width: 100%;
  height: 4.4rem;
  padding: 0 1.2rem;
  border: 1px solid ${({theme:e})=>e.color.black[300]};
  border-radius: 0.5rem;

  background-color: ${({theme:e,$isChecked:t})=>t?e.color.primary[800]:e.color.black[0]};
  color: ${({theme:e,$isChecked:t})=>t?e.color.black[0]:e.color.black[700]};
  font-size: ${({theme:e})=>e.fontSize.md};

  transition: all 0.2s ease-out;

  &:hover {
    background-color: ${({theme:e})=>e.color.primary[800]};
    color: ${({theme:e})=>e.color.black[0]};
  }
`,fe=({closeModal:e,categoryName:t,categoryId:i,isChecked:o,handleSelectedCategoryId:n})=>{const{addToast:s}=(0,me.A)();return(0,r.jsx)(he,{children:(0,r.jsxs)(ue,{id:i,onClick:i=>{o||(n(i.currentTarget.id),s({status:"SUCCESS",message:`${t}가 선택되었어요.`}),e())},children:[(0,r.jsx)("img",{src:o?le.hk:le.GI,alt:o?"체크됨":"체크되지 않음"}),(0,r.jsx)(pe,{$isChecked:o,children:(0,r.jsx)("p",{children:t})})]})})},ge=(h.AH`
  width: 100%;

  font-size: ${({theme:e})=>e.fontSize.md};
`,h.Ay.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  color: ${({theme:e})=>e.color.black[800]};
  font-size: ${({theme:e})=>e.fontSize.lg};
`),xe=h.Ay.ul`
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;

  width: 100%;
`,ye=({isOpen:e,closeModal:t,categories:i,selectedCategoryId:o,handleSelectedCategoryId:n})=>(0,r.jsxs)(de.a,{isOpen:e,close:t,size:"45rem",children:[(0,r.jsx)(de.a.Header,{children:(0,r.jsx)(ge,{children:(0,r.jsx)("p",{children:"카테고리 선택"})})}),(0,r.jsx)(de.a.CloseButton,{close:t}),(0,r.jsx)(de.a.Body,{children:(0,r.jsx)(xe,{children:i.map((e=>(0,r.jsx)(fe,{closeModal:t,categoryName:e.value,categoryId:e.id,isChecked:e.id===o,handleSelectedCategoryId:n},e.id)))})})]});var be=i(6512),$e=i(563),ve=i(7594);const we=h.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({theme:e})=>e.fontSize.lg};
`,je=h.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`,Ae=({selectedCategoryName:e,onButtonClick:t})=>(0,r.jsxs)(we,{children:[(0,r.jsxs)(je,{children:[(0,r.jsx)(be.CJN,{size:ve.w.fontSize.h6,color:ve.w.color.primary[700]}),(0,r.jsx)("p",{children:"링크"})]}),(0,r.jsx)($e.A,{size:"sm",rounded:!0,onClick:e=>{e.stopPropagation(),t()},children:e})]});var Se=i(9879);const Ee=h.Ay.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: ${({$columns:e})=>e>2&&"center"};
  gap: 1rem;
  overflow-y: auto;

  padding: 3rem;
`,ke=h.Ay.div`
  flex-grow: 1;

  height: 0;
  padding: 2rem;

  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.md};
`,Re=h.Ay.ul`
  gap: 3rem 0;

  width: 100%;
  padding: 0;

  ${({$columns:e})=>e<=2?h.AH`
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
        `:h.AH`
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
          place-items: center;
        `}

  li {
    list-style-type: none;
  }
`,ze=h.Ay.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 17rem;
  height: 20rem;
  border: 1px solid ${({theme:e})=>e.color.black[100]};
  border-radius: 1.5rem;
`,Oe=h.Ay.img`
  width: 100%;
  height: 10rem;

  object-fit: cover;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
`,Te=h.Ay.div`
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
`,Ce=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow: hidden;

  width: 100%;
  height: 10rem;
  max-height: 12rem;
  padding: 1.5rem;

  cursor: pointer;
`,_e=h.Ay.p`
  overflow: hidden;

  width: 100%;

  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`,Ie=h.Ay.p`
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
`,Ne=((0,h.Ay)(Se.m6K)`
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
`,({references:e})=>!e||e.length<1?(0,r.jsx)(ke,{children:"저장된 링크가 없습니다."}):(0,r.jsx)(Ee,{$columns:e.length,children:(0,r.jsx)(Re,{$columns:e.length,children:e.map((e=>(0,r.jsx)(ze,{children:(0,r.jsxs)(c.N_,{to:e.url,target:"_blank",children:[e.image?(0,r.jsx)(Oe,{alt:"link",src:e.image}):(0,r.jsxs)(Te,{children:["이미지가",(0,r.jsx)("br",{}),"없습니다"]}),(0,r.jsxs)(Ce,{children:[(0,r.jsx)(_e,{children:e.openGraphTitle||e.headTitle}),(0,r.jsx)(Ie,{children:e.description})]})]})},e.id)))})}));var Me=i(5617),Fe=i(2298),Pe=i(4010),De=i(9270),Ue=i(7701),Ge=i(5778);var We=i(8198);const Le=h.Ay.div`
  width: 50%;
  min-width: 45rem;
`,He=h.Ay.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: calc(100vh - 20rem);

  border-top: 1px solid ${({theme:e})=>e.color.black[300]};
`,Be=({accessCode:e})=>{const[t,i]=(0,o.useState)(Pe.zb),{isModalOpen:n,openModal:s,closeModal:a}=(0,Fe.A)(),{categories:l,isCategoryExist:c}=(0,Pe.Ay)(e),{references:d}=((e,t)=>{const{data:i}=(0,De.I)({queryKey:[Ge.e.GET_REFERENCE_LINKS,e],queryFn:()=>(0,Ue.fF)({accessCode:t,categoryId:e})});return{references:i}})(t,e),m=(0,We.r)(l,t)||Pe.vz;return(0,r.jsxs)(Le,{children:[(0,r.jsxs)(Me.q,{children:[(0,r.jsx)(Ae,{selectedCategoryName:m,onButtonClick:s}),(0,r.jsx)(He,{children:(0,r.jsx)(Ne,{references:d})})]}),(0,r.jsx)(ye,{isOpen:n,closeModal:a,categories:l,isCategoryExist:c,selectedCategoryId:t,handleSelectedCategoryId:e=>i(e)})]})},qe=h.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`,Ye=h.Ay.div`
  color: ${({theme:e})=>e.color.black[700]};
  font-size: ${({theme:e})=>e.fontSize.sm};
`,Ke=({accessCode:e})=>{const t=(0,u.Zp)(),{userStatus:i}=(0,f.A)(),{isUserInPairRoom:o,isUserInPairRoomFetching:n}=(e=>{const{data:t,isFetching:i}=(0,De.I)({queryKey:[Ge.e.GET_USER_IS_IN_PAIR_ROOM],queryFn:()=>(async e=>{const t=await g.A.get({url:`undefined/member/${e}/exists`,errorMessage:x.U.GET_USER_IS_IN_PAIR_ROOM});return await t.json()})(e),enabled:!!e});return{isUserInPairRoom:t?.exists,isUserInPairRoomFetching:i}})(e),{isUserRetrospectExists:s,isUserRetrospectExistsFetching:a}=(e=>{const{data:t,isFetching:i}=(0,De.I)({queryKey:[Ge.e.GET_USER_RETROSPECT_EXISTS],queryFn:()=>(async e=>{const t=await g.A.get({url:`undefined/member/retrospect/${e}/exists`,errorMessage:x.U.GET_USER_RETROSPECT_EXISTS});return await t.json()})(e),enabled:!!e});return{isUserRetrospectExists:t?.existRetrospect,isUserRetrospectExistsFetching:i}})(e);return n||a?(0,r.jsxs)(qe,{children:[(0,r.jsx)($e.A,{size:"lg",disabled:!0,children:"회고 작성"}),(0,r.jsx)(Ye,{children:"잠시만 기다려주세요..."})]}):"SIGNED_IN"===i&&o?(0,r.jsxs)(qe,{children:[(0,r.jsx)($e.A,{size:"lg",onClick:async()=>{t(s?`/room/${e}/retrospect`:`/room/${e}/retrospectForm`,{state:{valid:!0}})},children:s?"회고 확인":"회고 작성"}),(0,r.jsx)(Ye,{children:s?"작성된 회고를 확인하러 가볼까요?":"이번 페어 프로그래밍은 어떠셨나요? 회고를 작성해 주세요."})]}):(0,r.jsxs)(qe,{children:[(0,r.jsx)($e.A,{size:"lg",disabled:!0,children:"회고 작성"}),(0,r.jsx)(Ye,{children:"로그인 후 현재 페어룸에 등록된 사람만 회고를 작성할 수 있어요."})]})},Ve=h.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 6rem;
  padding: 2rem;

  font-size: ${({theme:e})=>e.fontSize.lg};
`,Xe=()=>(0,r.jsxs)(Ve,{children:[(0,r.jsx)(be.tF0,{size:ve.w.fontSize.h6,color:ve.w.color.primary[700]}),(0,r.jsx)("p",{children:"투두 리스트"})]}),Ze=h.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;

  padding: 1.6rem;
  border-radius: 1rem;

  background: ${({$isChecked:e,theme:t})=>e?t.color.black[200]:t.color.secondary[100]};
  font-size: ${({theme:e})=>e.fontSize.md};

  transition: background 0.1s ease;
`,Je=h.Ay.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  p {
    text-decoration: ${({$isChecked:e})=>e&&"line-through"};
    word-break: break-all;

    transition: text-decoration 0.1s ease;
  }
`,Qe=h.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`,et=(0,h.Ay)(D.$6X)`
  width: 1.7rem;
  height: 1.7rem;

  color: ${({$isChecked:e,theme:t})=>e?t.color.black[300]:t.color.secondary[500]};

  transition: color 0.1s ease;

  cursor: pointer;

  &:hover {
    color: ${({$isChecked:e,theme:t})=>e?t.color.black[400]:t.color.secondary[600]};
  }
`,tt=({todo:e})=>{const[t,i]=(0,o.useState)(!1),[,n]=(0,P.A)(),{isChecked:s,content:a}=e;return(0,r.jsxs)(Ze,{$isChecked:s,$isIconHovered:t,children:[(0,r.jsx)(Je,{$isChecked:s,children:(0,r.jsx)("p",{children:a})}),(0,r.jsx)(Qe,{children:(0,r.jsx)(et,{$isChecked:s,onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),onClick:()=>n(a)})})]})};var it=i(1534);const rt=h.Ay.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;

  padding: 2rem;
`,ot=h.Ay.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`,nt=h.Ay.p`
  color: ${({theme:e})=>e.color.black[700]};
  font-size: ${({theme:e})=>e.fontSize.sm};
`,st=h.Ay.p`
  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.md};
`,at=()=>{const{accessCode:e}=(0,u.g)(),{todos:t}=(e=>{const{data:t}=(0,De.I)({queryKey:[Ge.e.GET_TODOS],queryFn:()=>(0,it.Gg)(e)});return{todos:t||[]}})(e||"");return(0,r.jsx)(rt,{children:t.length>0?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(nt,{children:["총 ",t.length,"개"]}),(0,r.jsx)(ot,{children:t.map((e=>(0,r.jsx)(tt,{todo:e},e.id)))})]}):(0,r.jsx)(st,{children:"저장된 투두 리스트가 없습니다."})})},lt=h.Ay.div`
  width: 50%;
  min-width: 45rem;
`,ct=h.Ay.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: calc(100vh - 20rem);

  border-top: 1px solid ${({theme:e})=>e.color.black[300]};
`,dt=()=>(0,r.jsx)(lt,{children:(0,r.jsxs)(Me.q,{children:[(0,r.jsx)(Xe,{}),(0,r.jsx)(ct,{children:(0,r.jsx)(at,{})})]})});var mt=i(3795);const ht=h.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;

  width: 100%;
  height: calc(100vh - 7rem);
  min-height: 60rem;
  padding: 2rem;

  background: ${({theme:e})=>e.color.black[50]};
`,ut=h.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 30%;
  min-width: 40rem;
  height: calc(100vh - 7rem);
  padding: 2rem;
`,pt=h.Ay.div`
  display: flex;
  gap: 2rem;

  width: 70%;
`,ft=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`,gt=h.Ay.div`
  color: ${({theme:e})=>e.color.black[800]};
  font-size: ${({theme:e})=>e.fontSize.h2};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
`,xt=h.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.2rem 1.5rem;
  border-radius: 1rem;

  background-color: ${({theme:e})=>e.color.black[200]};
  color: ${({theme:e})=>e.color.black[700]};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,yt=h.Ay.span`
  color: ${({theme:e})=>e.color.primary[700]};
`,bt=h.Ay.span`
  color: ${({theme:e})=>e.color.secondary[600]};
`,$t=h.Ay.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  width: fit-content;
  height: 4rem;
  padding: 1rem 2rem;
  border-radius: 1rem;

  background-color: ${({theme:e})=>e.color.black[800]};
  color: ${({theme:e})=>e.color.black[0]};
  font-size: ${({theme:e})=>e.fontSize.base};

  transition: all 0.2s;

  &:hover {
    background-color: ${({theme:e})=>e.color.black[900]};

    transform: scale(1.01);
  }
`,vt=h.Ay.img`
  width: 2rem;
  height: 2rem;
`,wt=()=>{const{accessCode:e}=(0,u.g)(),{driver:t,navigator:i,missionUrl:o,isFetching:n}=(0,mt.A)(e||"");return n?(0,r.jsx)(ce.A,{}):(0,r.jsxs)(ht,{children:[(0,r.jsxs)(ut,{children:[(0,r.jsxs)(ft,{children:[(0,r.jsx)(gt,{children:e}),(0,r.jsxs)(xt,{children:[(0,r.jsx)(yt,{children:t}),"와(과) ",(0,r.jsx)(bt,{children:i}),"의 기록이에요"]})]}),o&&(0,r.jsx)(c.N_,{to:o,target:"_blank",children:(0,r.jsxs)($t,{children:[(0,r.jsx)(vt,{src:le.qZ}),"미션 리포지토리로 이동"]})}),(0,r.jsx)(Ke,{accessCode:e||""})]}),(0,r.jsxs)(pt,{children:[(0,r.jsx)(dt,{}),(0,r.jsx)(Be,{accessCode:e||""})]})]})},jt=h.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;

  height: calc(100vh - 7rem);
  padding: 15rem;

  background-color: ${({theme:e})=>e.color.primary[50]};
`,At=h.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`,St=h.Ay.h1`
  color: ${({theme:e})=>e.color.primary[900]};
  font-size: ${({theme:e})=>e.fontSize.h1};
  font-weight: bold;
`,Et=h.Ay.p`
  font-size: ${({theme:e})=>e.fontSize.md};
  line-height: 1.5;
  text-align: center;
`,kt=()=>(0,r.jsxs)(jt,{children:[(0,r.jsxs)(At,{children:[(0,r.jsx)(St,{children:"404"}),(0,r.jsx)(Et,{children:"페이지를 불러오는 중 문제가 발생했습니다."})]}),(0,r.jsx)(c.N_,{to:"/",children:(0,r.jsx)($e.A,{fontWeight:ve.w.fontSize.md,size:"lg","aria-label":"홈으로 이동",children:"홈으로 이동"})})]}),Rt=h.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12rem;
  overflow: hidden;

  height: calc(100vh - 7rem);
  padding: 10rem;

  background: linear-gradient(
    140deg,
    ${({theme:e})=>e.color.secondary[50]},
    ${({theme:e})=>e.color.primary[100]}
  );
  background-color: ${({theme:e})=>e.color.black[0]};

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    padding: 4rem;
  }
`,zt=h.Ay.h2`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.h3};
  font-weight: ${({theme:e})=>e.fontWeight.normal};

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    font-size: ${({theme:e})=>e.fontSize.h4};
  }
`,Ot=h.Ay.img`
  width: 50rem;
  filter: drop-shadow(0 0 2rem ${({theme:e})=>e.color.black[0]});

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    width: 40rem;
  }
`,Tt=h.Ay.img`
  width: 3rem;
  height: 3rem;
  margin-right: 2rem;
`,Ct=h.Ay.div`
  display: flex;
  gap: 4rem;

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    flex-direction: column;
    gap: 2rem;
  }
`,_t=h.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;

  width: fit-content;
  height: fit-content;

  opacity: 0;

  &.frame-in {
    visibility: visible;

    animation: ${e=>{return h.AH`
        ${t=e.$animationDirection,h.i7`
  0% {
    opacity: 0;
    transform: ${"left"===t?"translateX(100%)":"right"===t?"translateX(-100%)":"top"===t?"translateY(100%)":"translateY(-100%)"};
  }

  100%{
    opacity: 1;
    transform: translateX(0%) translateY(0%);
  }
`}
      `;var t}}
      ${e=>e.$animationDuration}s forwards;
    animation-delay: ${e=>e.$animationDelay}s;
  }
`,It=({animationDirection:e="bottom",animationDuration:t=1.2,animationDelay:i=0,intersectionObserverOptions:n={},children:s})=>{const{ref:a,isInViewport:l}=((e={})=>{const[t,i]=(0,o.useState)(!1),[r,n]=(0,o.useState)(!1),s=(0,o.useRef)(null);return(0,o.useEffect)((()=>{if(!s.current)return;const t={...e},o=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting?(i(!0),n(!0)):r||i(!1)}))}),t);return o.observe(s.current),()=>{o.disconnect()}}),[e,r]),{isInViewport:r||t,ref:s}})(n);return(0,r.jsx)(_t,{ref:a,className:l?"frame-in":"",$animationDirection:e,$animationDuration:t,$animationDelay:i,children:s})};var Nt=i(1223),Mt=i(1983);const Ft=h.i7`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`,Pt=h.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  position: fixed;
  bottom: 2rem;
  left: calc(50% - 3rem);
  z-index: ${Mt.M.PLUS};

  padding: 1.5rem;
  border-radius: 3rem;

  opacity: 0.7;
  font-size: 2rem;

  animation: ${Ft} 1.5s infinite;
  transition: opacity 0.2s ease-in-out;

  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`,Dt=(0,h.Ay)(Nt.sUB)`
  color: ${({theme:e})=>e.color.primary[900]};

  transition: transform 0.3s ease-in-out;
  ${({$isBottom:e})=>e?h.AH`
        transform: rotate(180deg);
      `:h.AH`
        transform: rotate(0deg);
      `}
`,Ut=({targetSections:e})=>{const{currentSection:t,handleClick:i}=(({targetSections:e})=>{const t=e&&e.length>0?e:[{id:"top",position:"top"},{id:"bottom",position:"bottom"}],[i,r]=(0,o.useState)(t[0].id),n=()=>{const i=window.scrollY+window.innerHeight/2;!e&&window.scrollY<50?r("top"):!e&&window.innerHeight+window.scrollY>=document.body.scrollHeight-50?r("bottom"):t.some((e=>{const t=document.getElementById(e.id);return!(!t||!((e,t)=>{const i=e.offsetTop,r=i+e.offsetHeight;return t>=i&&t<r})(t,i)||(r(e.id),0))}))};return(0,o.useEffect)((()=>(window.addEventListener("scroll",n),()=>{window.removeEventListener("scroll",n)})),[]),{currentSection:i,handleClick:()=>{const e=(t.findIndex((e=>e.id===i))+1)%t.length,o=t[e];switch(o.id){case"top":window.scrollTo({top:0,behavior:"smooth"});break;case"bottom":window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});break;default:document.getElementById(o.id)?.scrollIntoView({behavior:"smooth"})}r(o.id)}}})({targetSections:e}),n=t===(e&&e.length>0?e[e.length-1].id:"bottom");return(0,r.jsx)(Pt,{onClick:i,$isBottom:n,children:(0,r.jsx)(Dt,{tabIndex:0,role:"button","aria-label":n?"위로 스크롤":"아래로 스크롤",size:"3rem",$isBottom:n})})},Gt=h.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  overflow-x: hidden;

  padding: 10rem 4rem;

  background: linear-gradient(
    75deg,
    ${({theme:e})=>e.color.secondary[50]},
    ${({theme:e})=>e.color.primary[100]}
  );
  background-color: ${({theme:e})=>e.color.black[0]};
  color: ${({theme:e})=>e.color.black[800]};
`,Wt=h.Ay.div`
  display: flex;
  gap: 8rem;

  & > * {
    flex-basis: 0;

    flex-grow: 1;
  }

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    flex-direction: column;
  }
`,Lt=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  width: 38rem;
  padding: 4rem;
  border-radius: 3rem;

  background-color: ${({theme:e})=>e.color.secondary[100]};
  font-size: ${({theme:e})=>e.fontSize.lg};
  line-height: 1.8;
`,Ht=h.Ay.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;

  width: 100%;
  border-radius: 1rem;

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
    word-break: keep-all;
  }

  text-align: ${({$textAlign:e="left"})=>e};
`,Bt=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
`,qt=h.Ay.h1`
  margin: 2rem 0;

  color: ${({theme:e})=>e.color.primary[900]};
  font-size: ${({theme:e})=>e.fontSize.h3};
  font-weight: ${({theme:e})=>e.fontWeight.bold};
`,Yt=h.Ay.p`
  color: ${({theme:e})=>e.color.black[800]};
  font-size: ${({theme:e})=>e.fontSize.h6};
  font-weight: ${({theme:e})=>e.fontWeight.normal};
  line-height: 2.2;
`,Kt=h.Ay.p`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.h6};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,Vt=h.Ay.span`
  color: ${({theme:e})=>e.color.primary[800]};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,Xt=h.Ay.p`
  color: ${({theme:e})=>e.color.primary[900]};
  font-style: italic;
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
  line-height: 1.8;
  text-align: center;
`,Zt=h.Ay.img`
  width: 32rem;
  height: 32rem;
  margin-top: 2rem;
`,Jt=()=>(0,r.jsxs)(Gt,{id:"how-to-pair",children:[(0,r.jsx)(It,{animationDirection:"right",animationDuration:.7,intersectionObserverOptions:{threshold:.5},children:(0,r.jsx)(Ht,{$textAlign:"center",children:(0,r.jsxs)(Bt,{children:[(0,r.jsx)(qt,{children:"페어 프로그래밍이란?"}),(0,r.jsxs)(Yt,{children:[(0,r.jsx)(Vt,{children:"페어 프로그래밍(Pair Programming)"}),"은 두 명의 프로그래머가 한 컴퓨터에서 함께 작업하며 소프트웨어 코드를 작성하는 협업 방식입니다."]}),(0,r.jsxs)(Yt,{children:["페어 프로그래밍에서는 두 사람이 각각 ",(0,r.jsx)(Vt,{children:"'드라이버(Driver)'"})," 와",(0,r.jsx)(Vt,{children:" '내비게이터(Navigator)'"})," 역할을 번갈아 가며 수행합니다:"]})]})})}),(0,r.jsx)(It,{animationDirection:"left",animationDuration:.7,intersectionObserverOptions:{threshold:.5},children:(0,r.jsxs)(Wt,{children:[(0,r.jsxs)(Lt,{children:[(0,r.jsx)(Kt,{children:"드라이버"}),"실제로 코드를 작성하는 사람으로,",(0,r.jsx)("br",{}),"내비게이터의 설계에 따라",(0,r.jsx)("br",{})," 코드를 타이핑합니다."]}),(0,r.jsxs)(Lt,{children:[(0,r.jsx)(Kt,{children:"내비게이터"}),"작성된 코드를 실시간으로 검토하고",(0,r.jsx)("br",{}),"개선할 부분을 제안하며,",(0,r.jsx)("br",{}),"코드의 전반적인 구조를 설계합니다."]})]})}),(0,r.jsx)(It,{animationDirection:"right",animationDuration:.7,intersectionObserverOptions:{threshold:.5},children:(0,r.jsxs)(Ht,{$textAlign:"right",children:[(0,r.jsx)(Zt,{alt:"",src:le.mD}),(0,r.jsxs)(Bt,{children:[(0,r.jsx)(qt,{children:"왜 페어 프로그래밍을 해야 할까요?"}),(0,r.jsxs)(Yt,{children:["서로의 대화를 통해 자연스럽게 코드 리뷰가 이루어져",(0,r.jsx)(Vt,{children:" 오류를 조기에 발견하고 수정"}),"할 수 있습니다.",(0,r.jsx)("br",{}),"또한 ",(0,r.jsx)(Vt,{children:"서로 다른 시각"}),"에서 문제를 바라보며 더 창의적이고 효율적인 해결책을 찾을 수 있습니다."]})]})]})}),(0,r.jsx)(It,{animationDirection:"left",animationDuration:.7,intersectionObserverOptions:{threshold:.5},children:(0,r.jsxs)(Ht,{children:[(0,r.jsxs)(Bt,{children:[(0,r.jsx)(qt,{children:"페어 프로그래밍의 방법"}),(0,r.jsxs)(Yt,{children:["서로 일정한 시간 간격으로 역할을 교환하며 ",(0,r.jsx)(Vt,{children:"지속적인 대화"}),"를 통해 코드의 질을 향상시킵니다. ",(0,r.jsx)("br",{})," 또한 주기적으로 작업 과정을 되돌아보고 개선점을 논의하여 다음 세션에서"," ",(0,r.jsx)(Vt,{children:"더 나은 협업"}),"을 할 수 있도록 합니다."]})]}),(0,r.jsx)(Zt,{alt:"",src:le.PU})]})}),(0,r.jsx)(It,{animationDirection:"top",animationDuration:.7,intersectionObserverOptions:{threshold:.5},children:(0,r.jsxs)(Xt,{children:["페어 프로그래밍은 단순히 코드를 함께 작성하는 것을 넘어,",(0,r.jsx)("br",{})," 협업을 통해 더 나은 코드를 만들어 나가는 과정입니다.",(0,r.jsx)("br",{}),"이를 통해 개발자들은 서로 배우고 성장하며, 더 나은 결과를 도출할 수 있습니다."]})})]}),Qt=()=>{const e=(0,u.Zp)();(0,o.useEffect)((()=>{const t=t=>{t.preventDefault(),e(1)};return window.addEventListener("popstate",t),window.history.pushState(null,"",window.location.href),()=>{window.removeEventListener("popstate",t)}}),[e])},ei=()=>({handleSignInGithub:async()=>{const e=await(async()=>{const e=await g.A.get({url:"undefined/sign-in/oauth/github",errorMessage:x.U.SIGN_IN});return await e.json()})();window.location.href=e.endpoint}});var ti=i(2657);const ii=[{id:"landing",position:"top"},{id:"how-to-pair",position:"bottom"}],ri=()=>{const e=(0,u.Zp)(),{userStatus:t}=(0,f.A)();(0,o.useEffect)((()=>{"SIGNED_IN"===t&&e("/main")}),[t]);const{handleSignInGithub:i}=ei();return(0,ti.A)(),Qt(),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(Rt,{id:"landing",children:[(0,r.jsx)(It,{animationDirection:"right",children:(0,r.jsx)(zt,{children:"당신의 첫 번째 페어 프로그래밍,"})}),(0,r.jsx)(It,{animationDirection:"right",animationDelay:.75,children:(0,r.jsx)(Ot,{src:le.Xo,alt:"코딩해듀오 로고"})}),(0,r.jsxs)(Ct,{children:[(0,r.jsx)(It,{animationDirection:"top",animationDelay:2,children:(0,r.jsxs)($e.A,{size:"xl",width:"26rem",color:"#000000",onClick:i,children:[(0,r.jsx)(Tt,{src:le.qZ,alt:""}),"Github로 로그인"]})}),(0,r.jsx)(It,{animationDirection:"top",animationDelay:2.1,children:(0,r.jsx)($e.A,{size:"xl",width:"26rem",color:"primary",onClick:()=>e("/main"),children:"회원가입 없이 사용하기"})})]})]}),(0,r.jsx)(Jt,{}),(0,r.jsx)(Ut,{targetSections:ii})]})};var oi=i(8027),ni=i(6872);const si=h.Ay.button`
  ${({$size:e})=>h.AH`
    ${(()=>{switch(e){case"base":return h.AH`
            font-size: ${ve.w.fontSize.base};
          `;case"sm":return h.AH`
            font-size: ${ve.w.fontSize.sm};
          `;case"md":return h.AH`
            font-size: ${ve.w.fontSize.md};
          `;case"lg":return h.AH`
            font-size: ${ve.w.fontSize.lg};
          `;case"xl":return h.AH`
            font-size: ${ve.w.fontSize.h6};
          `;default:return h.AH`
            font-size: ${e};
          `}})()}
  `};
  ${({$hoverType:e})=>h.AH`
    ${(()=>{switch(e){case"DARK":return h.AH`
            &:hover {
              filter: brightness(0.8);

              text-decoration: underline;
            }

            &:active {
              filter: brightness(0.6);

              text-decoration: underline;
            }
          `;case"LIGHT":return h.AH`
            &:hover {
              opacity: 0.7;
              text-decoration: underline;
            }

            &:active {
              opacity: 0.5;
              text-decoration: underline;
            }
          `}})()}
  `}
  justify-content: center;
  align-items: center;

  color: ${({$color:e})=>e};
  text-decoration: ${({$underline:e})=>e?"underline":"none"};

  transition: 0.2s;

  cursor: pointer;

  &:disabled {
    color: ${ve.w.color.black[500]};

    cursor: default;

    &:hover {
      opacity: none;
      text-decoration: none;
      filter: none;
    }

    &:active {
      opacity: none;
      text-decoration: none;
      filter: none;
    }
  }

  ${({$css:e})=>e}
`,ai=({text:e,size:t="base",$css:i,color:o=ve.w.color.black[800],disabled:n=!1,underline:s=!1,hoverType:a="LIGHT",...l})=>(0,r.jsx)(si,{$css:i,$size:t,$color:o,$underline:s,$hoverType:a,disabled:n,...l,children:e}),li=h.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: ${Mt.M.HEADER};

  width: 100%;
  height: 7rem;
  padding: 0 5rem;

  background-color: ${({theme:e})=>e.color.black[0]};
  color: ${({theme:e})=>e.color.black[800]};
  font-size: ${({theme:e})=>e.fontSize.base};

  border-bottom: 0.1rem solid ${({theme:e})=>e.color.black[50]};

  a,
  button {
    justify-content: center;
    align-items: center;

    transition: all 0.2s;

    cursor: pointer;

    &:hover {
      opacity: 0.7;
      text-decoration: underline;
    }

    &:active {
      opacity: 0.5;
      text-decoration: underline;
    }
  }

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    padding: 0 8vw;
  }
`,ci=h.Ay.img`
  width: 3.6rem;
  height: 3.6rem;

  transition: all 0.1s;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`,di=h.Ay.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1.4rem;
`,mi=(0,h.Ay)(c.N_)`
  display: inline;

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    display: none;
  }
`,hi=h.Ay.div`
  display: none;

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    display: inline;
  }
`,ui=()=>{const{username:e,userStatus:t}=(0,f.A)(),{handleSignInGithub:i}=ei(),{handleSignOut:o}=(()=>{const e=(0,u.Zp)(),{setUser:t}=(0,f.A)();return{handleSignOut:async()=>{await(async()=>{await g.A.get({url:"undefined/sign-out",errorMessage:x.U.SIGN_OUT})})(),t("","SIGNED_OUT"),document.cookie="whoami=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",e("/")}}})();return(0,r.jsxs)(li,{children:[(0,r.jsx)(c.N_,{to:"/","aria-label":"메인 페이지로 이동",children:(0,r.jsx)(ci,{src:le.f,alt:""})}),(0,r.jsxs)(di,{children:[(0,r.jsx)(mi,{to:"/coduo-docs","aria-label":"코딩해듀오 가이드북으로 이동",children:(0,r.jsx)(ai,{text:"코딩해듀오 가이드북"})}),(0,r.jsx)(hi,{children:(0,r.jsx)(c.N_,{to:"/coduo-docs","aria-label":"코딩해듀오 가이드북으로 이동",children:(0,r.jsx)(ni.A,{icon:(0,r.jsx)(oi.vd0,{size:ve.w.iconSize.sm,"aria-hidden":"true"}),size:"sm"})})}),"SIGNED_IN"===t?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(ai,{text:"로그아웃",onClick:o}),(0,r.jsx)(c.N_,{to:"/my-page","aria-label":`${e}의 마이페이지로 이동`,children:(0,r.jsx)("span",{"aria-hidden":"true",children:e})})]}):(0,r.jsx)(ai,{text:"Github로 로그인",onClick:i})]})]})};var pi=i(961);const fi=h.i7`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`,gi=h.i7`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`,xi=h.i7`
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
`,yi={SUCCESS:h.AH`
    background-color: ${({theme:e})=>e.color.success[600]};
  `,INFO:h.AH`
    background-color: ${({theme:e})=>e.color.info[400]};
  `,WARNING:h.AH`
    background-color: ${({theme:e})=>e.color.warning[500]};
  `,ERROR:h.AH`
    background-color: ${({theme:e})=>e.color.danger[500]};
  `},bi=h.Ay.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  width: 30rem;
  min-height: 5rem;
  padding: 1.2rem 1.8rem;
  border-radius: 1.5rem;

  color: ${({theme:e})=>e.color.black[0]};
  font-size: ${({theme:e})=>e.fontSize.md};
  line-height: 1.5;

  animation:
    ${({$isOpen:e})=>e?fi:gi} 0.8s none,
    ${({$isPush:e})=>e&&xi} 0.5s none;

  ${({$status:e})=>yi[e]};
`,$i={SUCCESS:"✅",INFO:"📖",WARNING:"👀",ERROR:"⛔️"},vi=({isOpen:e,isPush:t,message:i,status:o="ERROR"})=>(0,r.jsxs)(bi,{role:"alert","aria-live":"assertive",$isOpen:e,$isPush:t,$status:o,children:[(0,r.jsx)("p",{"aria-hidden":"true",children:$i[o]}),(0,r.jsx)("p",{children:i})]}),wi=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  position: fixed;
  top: 9rem;
  right: 2rem;
  z-index: ${Mt.M.TOAST};
`,ji=()=>{const{toastList:e}=(0,me.A)();return(0,pi.createPortal)((0,r.jsx)(wi,{children:e.map((e=>(0,r.jsx)(vi,{isOpen:e.isOpen,isPush:e.isPush,message:e.message,status:e.status},e.id)))}),document.body)},Ai=h.Ay.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  min-width: fit-content;
`,Si=h.Ay.main`
  margin-top: 7rem;
`,Ei=()=>(0,r.jsxs)(Ai,{children:[(0,r.jsx)(ui,{}),(0,r.jsx)(Si,{role:"presentation",children:(0,r.jsx)(u.sv,{})}),(0,r.jsx)(ji,{})]}),ki=h.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  overflow: hidden;

  position: relative;

  min-height: calc(100vh - 7rem);
  padding: 8rem 10.8vw;

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    flex-direction: column;
    justify-content: center;
    gap: 8rem;

    padding: 8rem 5.4vw;
  }
`,Ri=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`,zi=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    align-items: center;
    gap: 4rem;

    text-align: center;
  }
`,Oi=h.Ay.h2`
  color: ${({theme:e})=>e.color.primary[900]};
  font-size: ${({theme:e})=>e.fontSize.h3};
  font-weight: ${({theme:e})=>e.fontWeight.light};
  line-height: 1.4;

  span {
    font-weight: ${({theme:e})=>e.fontWeight.medium};
  }

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    font-size: ${({theme:e})=>e.fontSize.h4};
  }
`,Ti=h.Ay.h1`
  color: ${({theme:e})=>e.color.primary[600]};
  font-size: 9rem;
  font-weight: ${({theme:e})=>e.fontWeight.medium};

  span {
    color: ${({theme:e})=>e.color.secondary[500]};
  }

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    font-size: 8rem;
  }
`,Ci=h.Ay.p`
  opacity: 0.5;
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.lg};
  line-height: 1.6;

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    display: none;
  }
`,_i=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;h.AH`
  width: 24rem;
  height: 6rem;

  font-size: ${({theme:e})=>e.fontSize.h6};

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    width: 100%;
    min-width: 18rem;

    font-size: ${({theme:e})=>e.fontSize.lg};
  }
`;var Ii=i(656);h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,h.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  padding: 1.2rem 3.2rem;
  border-radius: 5rem;

  transition: background-color 0.2s ease-in-out;

  cursor: pointer;

  &:hover {
    background-color: ${({theme:e})=>e.color.black[300]};
  }

  &:active {
    background-color: ${({theme:e})=>e.color.black[400]};
  }
`,h.Ay.p`
  font-size: ${({theme:e})=>e.fontSize.h1};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,h.Ay.div`
  padding: 0.5rem;
  padding-bottom: 0;
  border-radius: 0.5rem;

  color: ${({theme:e})=>e.color.primary[600]};
`,h.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;const Ni=h.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  width: 100%;
  margin-top: 2.5rem;
`,Mi=({isOpen:e,closeModal:t})=>{const{buttonRef:i}=(0,Ii.A)(e);return(0,r.jsxs)(de.a,{isOpen:e,close:t,size:"60rem",children:[(0,r.jsx)(de.a.Header,{title:"페어룸 선택",subTitle:"어떤 방식으로 페어룸을 만들까요?"}),(0,r.jsxs)(Ni,{children:[(0,r.jsx)(c.N_,{to:"/onboarding?mission=false","aria-label":"미션 없이 그냥 시작할래요",children:(0,r.jsx)($e.A,{size:"lg",width:"100%",height:"6rem",fontSize:ve.w.fontSize.lg,color:"secondary",filled:!1,children:"그냥 시작할래요"})}),(0,r.jsx)(c.N_,{to:"/onboarding?mission=true","aria-label":"코딩해듀오가 깃허브 리포지토리로 제공하는 미션과 함께 시작할래요",children:(0,r.jsx)($e.A,{ref:i,size:"lg",width:"100%",height:"6rem",fontSize:ve.w.fontSize.lg,color:"secondary",children:"미션과 함께 시작할래요"})})]}),(0,r.jsx)(de.a.CloseButton,{close:t})]})};var Fi=i(7545),Pi=i(1185),Di=i(3847);const Ui=({isOpen:e,closeModal:t})=>{const i=(0,u.Zp)(),{addToast:o}=(0,me.A)(),{value:n,resetValue:s,handleChange:a}=(0,Di.A)(),{buttonRef:l}=(0,Ii.A)(e);return(0,r.jsxs)(de.a,{isOpen:e,close:t,size:"60rem",children:[(0,r.jsx)(de.a.Header,{title:"페어룸 참가하기"}),(0,r.jsx)(de.a.Body,{children:(0,r.jsxs)(Fi.F,{children:[(0,r.jsx)(Fi.F.Label,{children:"페어룸 참가 코드"}),(0,r.jsx)(Fi.F.Input,{onChange:a,value:n,placeholder:"코드를 입력해 주세요",onReset:()=>s()})]})}),(0,r.jsxs)(de.a.Footer,{children:[(0,r.jsx)($e.A,{size:"lg",onClick:t,filled:!1,children:"닫기"}),(0,r.jsx)($e.A,{ref:l,size:"lg",disabled:!n,onClick:async()=>{const{exists:e}=await(0,Pi.C_)(n);e?i(`/room/${n}`,{state:{valid:!0},replace:!0}):o({status:"ERROR",message:"해당 코드와 일치하는 방이 없습니다."})},children:"완료"})]}),(0,r.jsx)(de.a.CloseButton,{close:t})]})},Gi=h.i7`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`,Wi=h.Ay.div`
  overflow: hidden;

  position: fixed;
  z-index: ${Mt.M.MINUS};

  width: 100vw;
  height: calc(100vh - 7rem);
`,Li=h.Ay.div`
  position: absolute;
  bottom: calc(30vh);
  left: calc(-40vw);

  width: 150%;
  border-radius: 43%;

  opacity: 0.3;

  aspect-ratio: 1 / 1;

  transform-origin: 50% 48%;

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    width: 180%;
  }
`,Hi=(0,h.Ay)(Li)`
  background: ${({theme:e})=>e.color.primary[200]};

  animation: ${Gi} 40s infinite linear;
`,Bi=(0,h.Ay)(Li)`
  background: ${({theme:e})=>e.color.primary[100]};

  animation: ${Gi} 13s infinite linear;
`,qi=()=>(0,r.jsxs)(Wi,{children:[(0,r.jsx)(Hi,{}),(0,r.jsx)(Bi,{})]}),Yi=()=>{Qt();const{isModalOpen:e,openModal:t,closeModal:i}=(0,Fe.A)(),{isModalOpen:o,openModal:n,closeModal:s}=(0,Fe.A)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(qi,{}),(0,r.jsxs)(ki,{children:[(0,r.jsx)(It,{animationDirection:"right",children:(0,r.jsxs)(Ri,{children:[(0,r.jsxs)(zi,{role:"presentation",children:[(0,r.jsx)(Oi,{"aria-label":"협업과 성장을 위한 페어 프로그래밍",children:(0,r.jsxs)("p",{"aria-hidden":!0,children:[(0,r.jsx)("span",{children:"협업"}),"과 ",(0,r.jsx)("span",{children:"성장"}),"을 위한",(0,r.jsx)("br",{}),(0,r.jsx)("span",{children:"페어 프로그래밍-"})]})}),(0,r.jsx)(Ti,{"aria-label":"코딩해듀오",children:(0,r.jsxs)("p",{"aria-hidden":!0,children:["코딩해",(0,r.jsx)("span",{children:"듀오"})]})})]}),(0,r.jsxs)(Ci,{role:"presentation",children:["코딩해듀오는 페어 프로그래밍을 통해 더 나은 결과를 만들어내는 것을 목표로 합니다.",(0,r.jsx)("br",{}),"직관적인 인터페이스와 실시간 협업 도구로, 누구나 쉽게 사용할 수 있습니다."]})]})}),(0,r.jsxs)(_i,{children:[(0,r.jsx)(It,{animationDirection:"left",animationDelay:.2,children:(0,r.jsx)($e.A,{size:"xl",borderRadius:"6rem",onClick:t,children:"페어룸 만들기"})}),(0,r.jsx)(It,{animationDirection:"left",animationDelay:.4,children:(0,r.jsx)($e.A,{size:"xl",borderRadius:"6rem",filled:!1,onClick:n,children:"페어룸 들어가기"})})]}),(0,r.jsx)(Mi,{isOpen:e,closeModal:i}),(0,r.jsx)(Ui,{isOpen:o,closeModal:s})]})]})};var Ki=i(57);const Vi=h.Ay.p`
  margin-top: 5rem;

  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.base};
`,Xi=({isFetching:e,length:t,emptyMessage:i,children:o})=>e?(0,r.jsx)(p.A,{}):t<1?(0,r.jsx)(Vi,{children:i}):(0,r.jsx)(r.Fragment,{children:o}),Zi=[{key:"pairRoom",title:"나의 페어룸"},{key:"retrospect",title:"나의 회고"}],Ji=h.Ay.button`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 20rem;
  padding-bottom: 1rem;

  cursor: pointer;

  p {
    color: ${({theme:e})=>e.color.black[800]};
    font-size: ${({theme:e})=>e.fontSize.lg};
    font-weight: ${({theme:e})=>e.fontWeight.medium};
  }

  ${({theme:e,$isActive:t})=>t&&`\n      border-bottom: 2px solid ${e.color.primary[800]};\n      \n      p {\n        color: ${e.color.primary[800]};\n      }\n    `}
`,Qi=h.Ay.div`
  display: flex;
  justify-content: center;
  gap: 12rem;

  width: 100%;
`,er=({length:e,currentTab:t,handleTabClick:i})=>(0,r.jsx)(Qi,{children:Zi.map(((o,n)=>(0,r.jsx)(Ji,{onClick:()=>i(o.key),$isActive:t===o.key,children:(0,r.jsxs)("p",{children:[o.title," (",e[n],")"]})},o.key)))});var tr=i(4700);const ir=h.i7`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`,rr=h.AH`
  font-size: ${({theme:e})=>e.fontSize.base};

  transition: color 0.7s ease;
`,or=h.AH`
  background: linear-gradient(
    90deg,
    ${({theme:e})=>e.color.black[400]},
    ${({theme:e})=>e.color.black[700]},
    ${({theme:e})=>e.color.black[400]}
  );

  animation: ${ir} 4s linear infinite;
  background-size: 200% 100%;
  background-clip: text;
`,nr=h.Ay.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;

  width: 100%;
`,sr=(0,h.Ay)(c.N_)`
  width: 100%;
`,ar=h.Ay.p`
  width: 15%;

  ${rr}
  color: ${({$status:e,theme:t})=>"IN_PROGRESS"===e?"transparent":t.color.black[700]};
  letter-spacing: 0.15rem;
  text-align: left;

  ${({$status:e})=>"IN_PROGRESS"===e&&or}

  &:hover {
    color: white;
  }
`,lr=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 50%;
`,cr=h.Ay.p`
  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: ${({theme:e})=>e.fontSize.md};

  transition: color 0.7s ease;

  span {
    color: ${({$status:e,theme:t,$color:i})=>"IN_PROGRESS"===e?t.color[i][600]:t.color.black[700]};
    font-size: ${({theme:e})=>e.fontSize.lg};
    font-weight: ${({theme:e})=>e.fontWeight.medium};

    transition: color 0.7s ease;
  }
`,dr=h.Ay.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 0.4rem;

  width: 11%;

  color: ${({theme:e})=>e.color.black[0]};

  transition: color 0.7s ease;
`,mr=h.Ay.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  position: relative;

  width: 100%;
  padding: 3rem;
  border-radius: 1rem;

  font-size: ${({theme:e})=>e.fontSize.base};

  cursor: pointer;

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    z-index: ${Mt.M.MINUS};

    width: 100%;
    height: 100%;
    border-radius: 1rem;

    background-color: ${({$status:e,$color:t,theme:i})=>"IN_PROGRESS"===e?i.color[t][100]:i.color.black[300]};
    background-image: ${({$status:e,theme:t,$color:i})=>"IN_PROGRESS"===e?`linear-gradient(\n      90deg,\n      ${t.color[i][100]} 0 75%,\n      ${t.color[i][600]} 75% 100%\n    )`:`linear-gradient(\n      90deg,\n      ${t.color.black[300]} 0 75%,\n      ${t.color.black[400]} 75% 100%\n    )`};
    background-size: 400% 100%;

    background-position: 72.5% 0;
    opacity: 0.7;

    transition:
      background-position 0.5s ease,
      opacity 0.2s ease;
  }

  &:hover::before {
    background-position: 105.8% 0;
    opacity: 0.9;
  }

  &:hover ${ar} {
    color: white;
    ${({$status:e})=>"IN_PROGRESS"===e&&h.AH`
        animation: ${ir} 4s linear infinite;
      `}
  }
  &:hover ${cr} {
    color: ${({theme:e})=>e.color.black[50]};

    span {
      color: ${({theme:e})=>e.color.black[0]};
    }
  }

  &:hover ${dr} {
    color: ${({theme:e})=>e.color.black[700]};
  }
`,hr=(0,h.Ay)(oi.RCe)`
  color: ${({theme:e})=>e.color.black[400]};
  font-size: 1.6rem;

  transition: color 0.3s ease;

  cursor: pointer;

  &:hover {
    color: ${({theme:e})=>e.color.danger[600]};
  }
`,ur=(h.Ay.span`
  color: ${({theme:e})=>e.color.danger[600]};
  font-size: ${({theme:e})=>e.fontSize.base};
  line-height: 1.5;
`,({driver:e,navigator:t,status:i,accessCode:o})=>{const{openModal:n,closeModal:s,isModalOpen:a}=(0,Fe.A)(),{deletePairRoomMutation:l,isDeletePairRoomPending:c}=(0,tr.A)();return c?(0,r.jsx)(nr,{children:(0,r.jsx)(p.A,{})}):(0,r.jsxs)(nr,{children:[(0,r.jsx)(sr,{to:`/room/${o}`,state:{valid:!0},replace:!0,children:(0,r.jsxs)(mr,{$status:i,$color:"secondary",children:[(0,r.jsxs)(lr,{children:[(0,r.jsxs)(cr,{$status:i,$color:"secondary",children:[(0,r.jsx)("span",{children:"드라이버"}),e]}),(0,r.jsxs)(cr,{$status:i,$color:"secondary",children:[(0,r.jsx)("span",{children:"내비게이터"}),t]})]}),(0,r.jsx)(ar,{$status:i,children:"IN_PROGRESS"===i?"진행 중":"진행 완료"}),(0,r.jsxs)(dr,{children:["입장",(0,r.jsx)(be.OQo,{size:"1.8rem"})]})]})}),(0,r.jsx)(hr,{onClick:e=>{e.preventDefault(),e.stopPropagation(),n()}}),(0,r.jsx)(Ki.A,{isOpen:a,close:s,title:"정말 삭제하시겠습니까?",subTitle:"투두 리스트, 레퍼런스 링크 등 모든 데이터가 삭제됩니다.",confirmText:"삭제하기",onConfirm:async()=>{l({accessCode:o}),s()}})]})});var pr=i(7097);const fr=async({accessCode:e,answers:t})=>{await g.A.post({url:"undefined/retrospects",body:JSON.stringify({accessCode:e,answers:t}),errorMessage:x.U.ADD_RETROSPECT})},gr=async({accessCode:e})=>{await g.A.delete({url:`undefined/retrospects/${e}`,errorMessage:x.U.DELETE_RETROSPECT})},xr=()=>{const e=(0,m.jE)(),{addToast:t}=(0,me.A)(),{mutate:i}=(0,pr.n)({mutationFn:fr,onSuccess:()=>t({status:"SUCCESS",message:"회고 작성이 완료되었습니다."}),onError:e=>t({status:"ERROR",message:e.message})}),{mutate:r}=(0,pr.n)({mutationFn:gr,onSuccess:()=>e.invalidateQueries({queryKey:[Ge.e.GET_MY_RETROSPECTS]}),onError:e=>t({status:"ERROR",message:e.message})});return{addRetrospectMutation:i,deleteRetrospectMutation:r}},yr=({accessCode:e,answer:t})=>{const{openModal:i,closeModal:o,isModalOpen:n}=(0,Fe.A)(),{deleteRetrospectMutation:s}=xr();return(0,r.jsxs)(nr,{children:[(0,r.jsx)(sr,{to:`/room/${e}/retrospect`,state:{valid:!0},children:(0,r.jsxs)(mr,{$status:"IN_PROGRESS",$color:"primary",children:[(0,r.jsx)(lr,{children:(0,r.jsxs)(cr,{$status:"IN_PROGRESS",$color:"primary",children:[(0,r.jsx)("span",{children:e}),(e=>e.length>10?e.slice(0,10)+"...":e)(t)]})}),(0,r.jsxs)(dr,{children:["보기",(0,r.jsx)(be.OQo,{size:"1.8rem"})]})]})}),(0,r.jsx)(hr,{onClick:e=>{e.preventDefault(),e.stopPropagation(),i()}}),(0,r.jsx)(Ki.A,{isOpen:n,close:o,title:"정말 삭제하시겠습니까?",subTitle:"해당 회고의 모든 내용이 삭제됩니다.",confirmText:"삭제하기",onConfirm:async()=>{s({accessCode:e}),o()}})]})},br=()=>{const[e,t]=(0,o.useState)("pairRoom"),{myPairRooms:i,isMyPairRoomsFetching:n}=(()=>{const{data:e,isFetching:t}=(0,De.I)({queryKey:[Ge.e.GET_MY_PAIR_ROOMS],queryFn:v,retry:!1,refetchOnWindowFocus:!1});return{myPairRooms:e,isMyPairRoomsFetching:t}})(),{myRetrospects:s,isMyRetrospectsFetching:a}=(()=>{const{data:e,isFetching:t}=(0,De.I)({queryKey:[Ge.e.GET_MY_RETROSPECTS],queryFn:w,retry:!1});return{myRetrospects:e?.retrospects||[],isMyRetrospectsFetching:t}})(),l=i?.length||0,c=s?.length||0;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(er,{length:[l,c],currentTab:e,handleTabClick:e=>{t(e)}}),e===Zi[0].key&&(0,r.jsx)(Xi,{length:l,emptyMessage:"생성한 페어룸이 없습니다.",isFetching:n,children:i?.map((e=>(0,r.jsx)(ur,{driver:e.driver,navigator:e.navigator,status:e.status,accessCode:e.accessCode},e.id)))}),e===Zi[1].key&&(0,r.jsx)(Xi,{length:c,emptyMessage:"작성한 회고가 없습니다.",isFetching:a,children:s?.map((e=>(0,r.jsx)(yr,{answer:e.answer,accessCode:e.accessCode},e.accessCode)))})]})},$r=h.Ay.div`
  display: flex;
  justify-content: center;
`,vr=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  width: 70rem;
  margin: 5rem 10rem;

  h2 {
    font-size: ${({theme:e})=>e.fontSize.lg};
    font-weight: ${({theme:e})=>e.fontWeight.normal};
  }
`,wr=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`,jr=h.Ay.h1`
  color: ${({theme:e})=>e.color.black[900]};
  font-size: ${({theme:e})=>e.fontSize.h2};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,Ar=h.Ay.p`
  color: ${({theme:e})=>e.color.black[900]};
  font-size: ${({theme:e})=>e.fontSize.h6};

  span {
    color: ${({theme:e})=>e.color.primary[700]};
    font-weight: ${({theme:e})=>e.fontWeight.medium};
  }
`,Sr=h.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`,Er=(h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`,h.Ay.p`
  padding-bottom: 1.6rem;

  color: ${({theme:e})=>e.color.black[700]};
  font-size: ${({theme:e})=>e.fontSize.md};
`,h.Ay.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;

  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.md};

  transition: all 0.2s ease;

  cursor: pointer;

  &:hover {
    color: ${({theme:e})=>e.color.black[500]};
    font-size: ${({theme:e})=>e.fontSize.md};
  }
`),kr=(h.Ay.div`
  margin: 1rem 0;
  border: 1px solid ${({theme:e})=>e.color.black[300]};
`,()=>{const{username:e}=(0,f.A)(),{isModalOpen:t,openModal:i,closeModal:o}=(0,Fe.A)(),{deleteMemberMutation:n}=(()=>{const e=(0,u.Zp)(),{resetUser:t}=(0,f.A)(),{addToast:i}=(0,me.A)(),{mutate:r,isSuccess:o}=(0,pr.n)({mutationFn:$,onSuccess:()=>{t(),i({status:"SUCCESS",message:"지금까지 코딩해듀오와 함께 해 주셔서 감사해요. 다음에 또 만나요 👋🏻"}),e("/",{replace:!0})},onError:e=>i({status:"ERROR",message:e.message})});return{deleteMemberMutation:r,isSuccess:o}})();return(0,r.jsxs)($r,{children:[(0,r.jsxs)(vr,{children:[(0,r.jsxs)(wr,{children:[(0,r.jsx)(jr,{children:"마이 페이지"}),(0,r.jsxs)(Ar,{children:[(0,r.jsx)("span",{children:e})," 님의 마이 페이지에 오신 걸 환영합니다!"]})]}),(0,r.jsx)(Sr,{children:(0,r.jsx)(br,{})}),(0,r.jsxs)(Er,{onClick:i,children:["회원 탈퇴하기",(0,r.jsx)(be.OQo,{size:"1.5rem"})]})]}),(0,r.jsx)(Ki.A,{isOpen:t,close:o,title:"정말 탈퇴하시겠습니까?",subTitle:"해당 작업은 다시 복구할 수 없습니다.",confirmText:"탈퇴하기",onConfirm:n})]})});var Rr=i(5639),zr=i(4251);const Or=new Rr.E({auth:void 0}),Tr="coduo-missions",Cr=async({repositoryName:e,branchName:t,sha:i})=>{try{return await Or.request(`POST /repos/${Tr}/${e}/git/refs`,{ref:`refs/heads/${t}`,sha:i})}catch(e){if(e instanceof Error)throw new Error(e.message);zr.Cp(e)}};var _r=i(6973);const Ir=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`,Nr=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,Mr=h.Ay.div`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,Fr=h.Ay.div`
  color: ${({theme:e})=>e.color.primary[700]};
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.normal};
`,Pr=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`,Dr=h.Ay.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: relative;

  width: 30rem;
  height: 4rem;
  padding: 0 1.5rem;
  border-radius: 0.5rem;

  background-color: ${({theme:e})=>e.color.black[800]};
  color: ${({theme:e})=>e.color.black[0]};
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,Ur=h.Ay.img`
  position: absolute;
  left: -2rem;

  width: 5rem;
  object-fit: cover;
`,Gr=h.Ay.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`,Wr=(0,h.Ay)(_r.zDP)`
  margin-top: 0.8rem;

  color: ${({theme:e})=>e.color.black[800]};
  font-size: ${({theme:e})=>e.fontSize.lg};
`,Lr=({repositoryName:e,branchName:t,onBranchName:i})=>{const{branches:o}=(e=>{const{data:t}=(0,De.I)({queryKey:[Ge.e.GET_BRANCHES,e],queryFn:()=>(async e=>{try{return(await Or.request(`GET /repos/${Tr}/${e}/branches`,{headers:{"X-GitHub-Api-Version":"2022-11-28"}})).data}catch(e){if(e instanceof Error)throw new Error(e.message);zr.Cp(e)}})(e)});return{branches:t?.map((e=>e.name))||[]}})(e);return(0,r.jsxs)(Ir,{"aria-label":`${e} 레포지토리가 선택되었습니다. 총 2개의 설정 항목 중 2번째 항목입니다.`,children:[(0,r.jsxs)(Nr,{children:[(0,r.jsx)(Mr,{children:e}),(0,r.jsx)(Fr,{children:"미션을 시작할 브랜치 이름을 입력해 주세요."})]}),(0,r.jsxs)(Pr,{children:[(0,r.jsxs)(Dr,{"aria-hidden":"true",children:[(0,r.jsx)(Ur,{src:le.qZ,alt:""}),e]}),(0,r.jsxs)(Gr,{children:[(0,r.jsx)(Wr,{"aria-hidden":"true"}),(0,r.jsxs)(Fi.F,{children:[(0,r.jsx)(Fi.F.Input,{autoFocus:!0,placeholder:"미션에서 사용할 브랜치 이름을 입력해 주세요.",value:t.value,status:t.status,onChange:e=>i(e,o)}),(0,r.jsx)(Fi.F.Message,{status:t.status,children:t.message})]})]})]})]})},Hr=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;

  padding: 2rem;
  border-radius: 1rem;

  background-color: ${({theme:e})=>e.color.primary[50]};
`,Br=h.Ay.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,qr=h.Ay.p`
  color: ${({theme:e})=>e.color.black[500]};
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.normal};
  line-height: 1.6;
`,Yr=({title:e,description:t})=>(0,r.jsxs)(Hr,{role:"presentation",children:[e&&(0,r.jsxs)(Br,{children:[(0,r.jsx)(Nt.qTh,{size:"2rem","aria-hidden":"true"}),e]}),(0,r.jsx)(qr,{children:t})]}),Kr=h.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.6rem;
`,Vr=h.Ay.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: relative;

  width: 100%;
  height: 4rem;
  padding: 0 1.5rem;
`,Xr=h.Ay.img`
  position: absolute;
  left: -2rem;

  width: 5rem;
  object-fit: cover;
`,Zr=(0,h.Ay)(c.N_)`
  display: flex;
  align-items: center;

  color: ${({theme:e})=>e.color.black[400]};
  font-size: ${({theme:e})=>e.fontSize.sm};
  text-decoration: underline;

  &:hover {
    color: ${({theme:e})=>e.color.black[400]};
  }
`,Jr=({id:e,name:t,onSelect:i})=>(0,r.jsxs)(Kr,{children:[(0,r.jsx)($e.A,{width:"30rem",borderRadius:"5px",color:"#000000",fontSize:ve.w.fontSize.md,fontWeight:"medium",textAlign:"right",name:t,animation:!1,onClick:e=>i(e.currentTarget.name),children:(0,r.jsxs)(Vr,{children:[(0,r.jsx)(Xr,{src:le.qZ,alt:""}),t]})},e),(0,r.jsxs)(Zr,{to:`https://github.com/coduo-missions/${t}`,target:"_blank","aria-label":`${t} 레포지토리로 이동하기`,children:["리포지토리로 이동하기",(0,r.jsx)(be.OQo,{})]})]}),Qr=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`,eo=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,to=h.Ay.div`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,io=h.Ay.div`
  color: ${({theme:e})=>e.color.primary[700]};
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.normal};
`,ro=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,oo=h.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;

  width: 100%;
`,no=(h.AH`
  border-width: 2px;

  &:hover {
    border-width: 2px;
  }

  &:active {
    border-width: 2px;
  }

  &:disabled {
    border-width: 2px;
  }
`,h.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 5rem;
  border-radius: 1rem;

  background-color: ${({theme:e})=>e.color.black[800]};
  color: ${({theme:e})=>e.color.black[0]};
`,h.Ay.input`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80%;
  height: 4rem;
  padding: 0 1rem;
  border: 2px solid ${({theme:e})=>e.color.black[700]};
  border-radius: 1rem;

  background-color: ${({theme:e})=>e.color.black[0]};
  color: ${({theme:e})=>e.color.black[700]};
`,h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,h.Ay.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`,h.Ay.p`
  color: ${({theme:e})=>e.color.danger[500]};
  font-size: ${({theme:e})=>e.fontSize.sm};
`,({onSelect:e})=>{const{repositories:t,isFetching:i}=(()=>{const{data:e,isFetching:t,error:i}=(0,De.I)({queryKey:[Ge.e.GET_REPOSITORIES],queryFn:()=>(async()=>{try{return(await Or.request(`GET /orgs/${Tr}/repos`,{org:"ORG",headers:{"X-GitHub-Api-Version":"2022-11-28"}})).data}catch(e){if(e instanceof Error)throw new Error(e.message);zr.Cp(e)}})(),refetchOnWindowFocus:!1});return{repositories:e?.filter((e=>e.name.startsWith("coduo")))||[],isFetching:t,error:i}})();return(0,r.jsxs)(Qr,{"aria-label":"총 2개의 설정 항목 중 1번째 항목입니다.",children:[(0,r.jsxs)(ro,{children:[(0,r.jsxs)(eo,{children:[(0,r.jsx)(to,{children:"미션 선택"}),(0,r.jsx)(io,{children:"구현해 볼 미션 레포지토리를 선택해 주세요."})]}),(0,r.jsx)(Yr,{title:"어떻게 미션을 선택할 수 있나요?",description:"미션을 선택하고 해당 미션 레포지토리에 원하는 이름으로 브랜치를 생성하세요. 생성된 브랜치로 이동하여 미션 코드를 관리할 수 있습니다."})]}),(0,r.jsx)(oo,{children:i?(0,r.jsx)(p.A,{size:"sm"}):t.map((t=>(0,r.jsx)(Jr,{id:t.id,name:t.name,onSelect:e},t.id)))})]})}),so=(e,t)=>{const[i,r]=(0,o.useState)(e);return(0,o.useEffect)((()=>{const i=setTimeout((()=>r(e)),t);return()=>clearTimeout(i)}),[e]),i},ao=(e,t)=>{const[i,r]=(0,o.useState)(e);var n;return t.some(Boolean)&&(n=e+t.filter(Boolean).length)>i&&r(n),(0,o.useEffect)((()=>{window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})}),[i]),{moveIndex:i}},lo=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;
`,co=h.Ay.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 5rem;
`,mo=({repositoryName:e,onRepositoryName:t,onAddBranch:i})=>{const{branchName:o,isValidBranchName:n,resetBranchName:s,handleBranchName:a}=(()=>{const{value:e,status:t,message:i,handleChange:r,resetValue:o}=(0,Di.A)();return{branchName:{value:e,status:t,message:i},isValidBranchName:"DEFAULT"===t&&""!==e&&e.length<=30,resetBranchName:o,handleBranchName:(e,t)=>{return r(e,(o=t,""===(i=e.target.value).trim()?{status:"ERROR",message:"값을 입력해 주세요."}:i.length>30?{status:"ERROR",message:"30자 이하로 입력해 주세요."}:o.includes(i)?{status:"ERROR",message:"중복된 브랜치 이름 입니다."}:{status:"DEFAULT",message:""}));var i,o}}})(),{moveIndex:l}=ao(0,[""!==e,so(n,500)]);return(0,r.jsxs)(lo,{"aria-label":"해당 섹션에서는 미션 레포지토리를 선택하고 브랜치 이름을 설정할 수 있습니다.",children:[(0,r.jsx)(no,{onSelect:e=>{t(e),s()}}),l>=1&&(0,r.jsx)(Lr,{repositoryName:e,branchName:o,onBranchName:a}),l>=2&&(0,r.jsx)(co,{children:(0,r.jsx)($e.A,{width:"15rem",disabled:!n,onClick:()=>i(e,o.value),children:"브랜치 생성하기"})})]})},ho=e=>""===e.trim()?{status:"ERROR",message:"값을 입력해 주세요."}:e.length>10?{status:"ERROR",message:"이름(또는 닉네임)은 10자 이하로 입력해 주세요."}:{status:"DEFAULT",message:""},uo=h.Ay.div`
  margin: 4rem 0;
`,po=h.Ay.div`
  display: flex;
  gap: 1rem;

  position: absolute;
  right: 4rem;
  bottom: 4rem;
`,fo=({isOpen:e,closeModal:t,onPairData:i})=>{const{addToast:o}=(0,me.A)(),{value:n,status:s,message:a,handleChange:l,resetValue:c}=(0,Di.A)(),{buttonRef:d}=(0,Ii.A)(e),m=()=>{c(),t()};return(0,r.jsxs)(de.a,{isOpen:e,close:m,size:"60rem",height:"34rem",children:[(0,r.jsx)(de.a.Header,{title:"페어 정보 연동하기"}),(0,r.jsx)(uo,{children:(0,r.jsxs)(Fi.F,{children:[(0,r.jsx)(Fi.F.Label,{children:"페어의 깃허브 아이디"}),(0,r.jsx)(Fi.F.Input,{placeholder:"깃허브 아이디를 입력해 주세요.",value:n,onChange:e=>l(e,""===e.target.value.trim()?{status:"ERROR",message:"값을 입력해 주세요."}:{status:"DEFAULT",message:""})}),(0,r.jsx)(Fi.F.Message,{status:s,children:a})]})}),(0,r.jsxs)(po,{children:[(0,r.jsx)($e.A,{size:"lg",onClick:m,filled:!1,children:"닫기"}),(0,r.jsx)($e.A,{ref:d,size:"lg",disabled:""===n.trim()||"ERROR"===s,onClick:()=>(async e=>{try{const{memberName:t}=await b(e);i(e,t),m(),o({status:"SUCCESS",message:"페어 정보 연동에 성공했습니다."})}catch(e){e instanceof Error&&o({status:"ERROR",message:e.message})}})(n),children:"연동하기"})]}),(0,r.jsx)(de.a.CloseButton,{close:m})]})},go=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,xo=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-bottom: 1rem;
`,yo=h.Ay.div`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,bo=h.Ay.div`
  color: ${({theme:e})=>e.color.primary[700]};
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.normal};
`,$o=(h.Ay.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`,h.Ay.button`
  display: flex;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 4.2rem;
    height: 4rem;
    border-radius: 0.5rem 0 0 0.5rem;

    background-color: ${({theme:e})=>e.color.primary[900]};

    transition: all 0.2s;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 15rem;
    height: 4rem;
    border-radius: 0 0.5rem 0.5rem 0;

    background-color: ${({theme:e})=>e.color.primary[600]};
    color: ${({theme:e})=>e.color.black[0]};
    font-size: ${({theme:e})=>e.fontSize.md};

    transition: all 0.2s;
  }

  img {
    width: 2.2rem;
    height: 2.2rem;
  }

  &:hover {
    p {
      background-color: ${({theme:e})=>e.color.primary[700]};
    }
  }
`),vo=({userPairName:e,pairId:t,pairName:i,onUserPairName:n,onPairName:s,openAddPairModal:a})=>{const[l,c]=(0,o.useState)(!!t);return(0,o.useEffect)((()=>{""!==t&&c(!0)}),[t]),(0,r.jsxs)(go,{"aria-label":"총 3개의 설정 항목 중 1번째 항목입니다.",children:[(0,r.jsxs)(xo,{children:[(0,r.jsx)(yo,{children:"이름 입력"}),(0,r.jsx)(bo,{children:"나와 페어의 이름을 입력해 주세요."})]}),(0,r.jsxs)(Fi.F,{children:[(0,r.jsx)(Fi.F.Label,{htmlFor:"my-name",children:"나의 이름은 무엇인가요?"}),(0,r.jsx)(Fi.F.Input,{id:"my-name",placeholder:"이름을 입력해 주세요.",value:e.value,status:e.status,onChange:n}),(0,r.jsx)(Fi.F.Message,{status:e.status,children:e.message})]}),(0,r.jsxs)(Fi.F,{children:[(0,r.jsx)(Fi.F.Label,{htmlFor:"pair-name",children:"함께할 페어의 이름은 무엇인가요?"}),l?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(Fi.F.Content,{children:[(0,r.jsx)(Fi.F.Input,{id:"pair-name",autoFocus:!0,placeholder:"이름을 입력해 주세요.",value:i.value,status:i.status,onChange:s}),!t&&(0,r.jsx)($e.A,{color:"primary",borderRadius:"1rem",fontSize:ve.w.fontSize.md,onClick:()=>c(!1),children:"취소"})]}),(0,r.jsx)(Fi.F.Message,{status:i.status,children:i.message})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)($o,{"aria-label":"페어 정보 연동하기 버튼, 클릭하시면 페어 정보 연동 모달이 열립니다.",onClick:a,children:[(0,r.jsx)("div",{"aria-hidden":"true",children:(0,r.jsx)("img",{src:le.f,alt:""})}),(0,r.jsx)("p",{children:"페어 정보 연동하기"})]}),(0,r.jsx)(ai,{text:"연동 없이 시작하기",onClick:()=>c(!0),underline:!0,color:ve.w.color.black[400],size:"sm",hoverType:"DARK"})]})]})]})};var wo=i(640);const jo=h.Ay.p`
  overflow: hidden;

  position: absolute;

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;

  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
`,Ao=({children:e})=>(0,r.jsx)(jo,{"aria-live":"polite",children:e}),So=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`,Eo=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,ko=h.Ay.div`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,Ro=h.Ay.div`
  color: ${({theme:e})=>e.color.primary[700]};
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.normal};
`,zo=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,Oo=h.Ay.div`
  display: flex;
  gap: 2rem;

  width: 100%;
`,To=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 50%;
`,Co=(h.Ay.p`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.base};
  font-weight: 500;
`,({userPairName:e,pairName:t,driver:i,navigator:n,onPairRole:s})=>{const[a,l]=(0,o.useState)("");(0,o.useEffect)((()=>{i&&n&&l(`현재 설정된 드라이버는 ${i}, 내비게이터는 ${n}입니다.`)}),[i,n]);const c=[{id:"1",value:e},{id:"2",value:t}],d=(e,t)=>{s((0,We.r)(c,e)||"",t)};return(0,r.jsxs)(So,{"aria-label":"총 3개의 설정 항목 중 2번째 항목입니다.",children:[(0,r.jsx)(Ao,{"aria-live":"polite",children:a}),(0,r.jsxs)(zo,{children:[(0,r.jsxs)(Eo,{role:"presentation",children:[(0,r.jsx)(ko,{children:"역할 설정"}),(0,r.jsx)(Ro,{children:"드라이버 / 내비게이터를 설정해 주세요."})]}),(0,r.jsx)(Yr,{title:"드라이버 / 내비게이터가 무엇인가요?",description:"드라이버는 키보드와 마우스를 사용하여 실제로 코드를 작성하는 사람입니다. 내비게이터는 코드의 논리적 흐름, 설계,\n      오류 등을 검토하며, 드라이버에게 피드백을 제공합니다."})]}),(0,r.jsxs)(Oo,{children:[(0,r.jsxs)(To,{children:[(0,r.jsx)(wo.m.Label,{message:"드라이버"}),(0,r.jsx)(wo.m,{placeholder:"이름을 선택해주세요.",options:c,selectedOption:i,onSelect:e=>d(e,"DRIVER")})]}),(0,r.jsxs)(To,{children:[(0,r.jsx)(wo.m.Label,{message:"내비게이터"}),(0,r.jsx)(wo.m,{placeholder:"이름을 선택해주세요.",options:c,selectedOption:n,onSelect:e=>d(e,"NAVIGATOR")})]})]})]})});var _o=i(5260);const Io=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`,No=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,Mo=h.Ay.div`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,Fo=h.Ay.div`
  color: ${({theme:e})=>e.color.primary[700]};
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.normal};
`,Po=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,Do=h.Ay.div`
  display: flex;
  gap: 2rem;

  width: 100%;
`,Uo=h.Ay.div`
  display: flex;
  gap: 0.5rem;
`,Go=[{label:"10분",value:"10"},{label:"15분",value:"15"},{label:"30분",value:"30"}],Wo=({timerDuration:e,onTimerDuration:t})=>{const[i,n]=(0,o.useState)(!1);return(0,r.jsxs)(Io,{"aria-label":"총 3개의 설정 항목 중 3번째 항목입니다.",children:[(0,r.jsxs)(Po,{children:[(0,r.jsxs)(No,{children:[(0,r.jsx)(Mo,{children:"타이머 설정"}),(0,r.jsx)(Fo,{children:"타이머 시간을 설정해 주세요."})]}),(0,r.jsx)(Yr,{title:"왜 타이머 시간을 설정해야 하나요?",description:"정기적인 역할 교대는 피드백을 주고받을 수 있는 자연스러운 기회를 제공합니다. 이는 코드 품질을 높이고, 문제를\n          조기에 발견하여 수정할 수 있게 합니다."})]}),(0,r.jsxs)(Do,{children:[Go.map((o=>(0,r.jsx)($e.A,{size:"md",borderRadius:"1rem",color:"primary",filled:e===o.value,onClick:()=>(e=>{i&&n(!1),t(e)})(o.value),children:o.label},o.value))),(0,r.jsxs)(Uo,{children:[(0,r.jsx)($e.A,{size:"md",borderRadius:"1rem",color:"primary",filled:i,onClick:()=>{i||n(!0),t("")},children:"직접 설정"},"직접 설정"),i&&(0,r.jsxs)(Fi.F,{gap:"0.5rem",width:"20rem",children:[(0,r.jsx)(Fi.F.Input,{autoFocus:!0,"aria-label":"타이머 시간을 분 단위로 입력해 주세요.",borderRadius:"1rem",height:"4rem",value:e,placeholder:"타이머 시간 (분)",status:(0,_o.W)(e)?"DEFAULT":"ERROR",disabled:!i,onChange:e=>{t(e.target.value)}}),(0,r.jsx)(Fi.F.Message,{status:(0,_o.W)(e)?"DEFAULT":"ERROR",children:(0,_o.W)(e)?"":"1 이상 99 이하의 숫자를 입력해 주세요."})]})]})]})]})},Lo=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;
`,Ho=h.Ay.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 5rem;
`,Bo=({repositoryName:e})=>{const t=(0,u.Zp)(),{userPairName:i,pairId:n,pairName:s,driver:a,navigator:l,timerDuration:c,isPairRoomNameValid:d,isPairRoleValid:m,isTimerDurationValid:h,handleUserPairName:p,handlePairName:g,handlePairData:x,handlePairRole:y,handleTimerDuration:b}=(()=>{const{username:e,userStatus:t}=(0,f.A)(),[i,r]=(0,o.useState)({value:"SIGNED_IN"===t?e:"",status:"DEFAULT",message:""}),[n,s]=(0,o.useState)({value:"",status:"DEFAULT",message:""}),[a,l]=(0,o.useState)(""),[c,d]=(0,o.useState)(""),[m,h]=(0,o.useState)(""),[u,p]=(0,o.useState)(""),g=""!==i.value&&""!==n.value&&"ERROR"!==i.status&&"ERROR"!==n.status,x=""!==c&&""!==m,y=""!==u&&(0,_o.W)(u),b=(e,t)=>{const i=ho(e),o=ho(t),n=(l=t,""!==(a=e).trim()&&""!==l.trim()&&a.trim()===l.trim()?{status:"ERROR",message:"중복된 이름(또는 닉네임)입니다. "}:{status:"DEFAULT",message:""});var a,l;r({value:e,status:"ERROR"!==i.status?n.status:i.status,message:"ERROR"!==i.status?n.message:i.message}),s({value:t,status:"ERROR"!==o.status?n.status:o.status,message:"ERROR"!==o.status?n.message:o.message})};return{userPairName:i,pairId:a,pairName:n,driver:c,navigator:m,timerDuration:u,isPairRoomNameValid:g,isPairRoleValid:x,isTimerDurationValid:y,handleUserPairName:e=>{i.value!==c&&i.value!==m||(d(""),h("")),b(e.target.value,n.value)},handlePairName:e=>{n.value!==c&&n.value!==m||(d(""),h("")),b(i.value,e.target.value)},handlePairData:(e,t)=>{l(e),b(i.value,t)},handlePairRole:(e,t)=>{const r=i.value===e?n.value:i.value;"DRIVER"===t?(d(e),h(r)):(d(r),h(e))},handleTimerDuration:e=>p(e)}})(),$=[so(d,500),m,h],{moveIndex:v}=ao(0,$),{isModalOpen:w,openModal:j,closeModal:A}=(0,Fe.A)(),{addPairRoomMutation:S}=(0,tr.A)();return(0,r.jsxs)(Lo,{"aria-label":"해당 섹션에서는 당신과 페어의 이름, 드라이버와 네비게이터, 타이머 시간을 설정할 수 있습니다.",children:[(0,r.jsx)(vo,{userPairName:i,pairId:n,pairName:s,onUserPairName:p,onPairName:g,openAddPairModal:j}),(0,r.jsx)(fo,{isOpen:w,closeModal:A,onPairData:x}),v>=1&&(0,r.jsx)(Co,{userPairName:i.value,pairName:s.value,driver:a,navigator:l,onPairRole:y}),v>=2&&(0,r.jsx)(Wo,{timerDuration:c,onTimerDuration:b}),v>=3&&(0,r.jsx)(Ho,{children:(0,r.jsx)($e.A,{size:"lg",disabled:$.some((e=>!e)),onClick:()=>{S({pairId:n,driver:a,navigator:l,missionUrl:""!==e?`https://github.com/coduo-missions/${e}`:"",timerDuration:60*Number(c)*1e3,timerRemainingTime:60*Number(c)*1e3},{onSuccess:e=>t(`/room/${e}`,{state:{valid:!0},replace:!0})})},children:"완료"})})]})},qo=h.Ay.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: calc(100vh - 7rem);

  background-color: ${({theme:e})=>e.color.primary[50]};
`,Yo=h.Ay.h1`
  color: ${({theme:e})=>e.color.primary[900]};
  font-size: ${({theme:e})=>e.fontSize.h3};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,Ko=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  width: 60%;
  min-width: 76.8rem;
  padding: 4rem 4rem 12rem;

  background-color: ${({theme:e})=>e.color.black[0]};

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    width: 100%;
    min-width: 0;
    padding: 4rem;
  }
`,Vo=(h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;
`,h.Ay.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 5rem;
`,()=>{const e=(0,u.zy)(),t=new URLSearchParams(e.search).get("mission"),[i,n]=(0,o.useState)(""),{handleAddBranch:s,isSuccess:a}=(()=>{const{addToast:e}=(0,me.A)(),{mutate:t,isSuccess:i}=(0,pr.n)({mutationFn:Cr,onSuccess:()=>e({status:"SUCCESS",message:"브랜치 생성에 성공했습니다."}),onError:()=>e({status:"ERROR",message:"브랜치 생성에 실패했습니다."})});return{handleAddBranch:async(e,i)=>{const r=await(async e=>{try{return(await Or.request(`GET /repos/${Tr}/${e}/git/refs/heads/main`,{headers:{"X-GitHub-Api-Version":"2022-11-28"}})).data.object.sha}catch(e){if(e instanceof Error)throw new Error(e.message);zr.Cp(e)}})(e);r&&""!=e&&t({repositoryName:e,branchName:i,sha:r})},isSuccess:i}})();return(0,r.jsx)(qo,{children:(0,r.jsxs)(Ko,{children:[(0,r.jsx)(Yo,{children:"true"===t?"미션과 함께 시작하기":"그냥 시작하기"}),"true"===t&&!a&&(0,r.jsx)(mo,{repositoryName:i,onRepositoryName:e=>n(e),onAddBranch:s}),("true"===t&&a||"false"===t)&&(0,r.jsx)(Bo,{repositoryName:i})]})})}),Xo=()=>{const e=(0,u.zy)(),{accessCode:t}=(0,u.g)(),[i,n]=(0,o.useState)(null),{addToast:s}=(0,me.A)();return(0,o.useEffect)((()=>{(async()=>{if("/my-page"===e.state?.from)return void n(!0);if(e.state?.from===`/${t}/retrospectForm`)return void n(!0);if(!t||!e.state?.valid)return n(!1),void s({status:"ERROR",message:"유효하지 않은 접근입니다. 올바른 경로로 접근해 주세요."});const{exists:i}=await(0,Pi.C_)(t||"");if(!i)return n(!1),void s({status:"ERROR",message:"유효하지 않은 접근입니다. 올바른 경로로 접근해 주세요."});n(!0)})()}),[]),null===i?(0,r.jsx)(ce.A,{}):i?(0,r.jsx)(u.sv,{}):(0,r.jsx)(u.C5,{to:"/main",replace:!0})},Zo=h.Ay.div`
  display: flex;
  justify-content: space-between;
`,Jo=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,Qo=h.Ay.h1`
  color: ${({theme:e})=>e.color.primary[900]};
  font-size: ${({theme:e})=>e.fontSize.h3};
  font-weight: ${({theme:e})=>e.fontWeight.semibold};
`,en=h.Ay.h2`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.lg};
`,tn=({title:e,subTitle:t,buttonText:i,onButtonClick:o})=>(0,r.jsxs)(Zo,{children:[(0,r.jsxs)(Jo,{children:[(0,r.jsx)(Qo,{children:e}),(0,r.jsx)(en,{children:t})]}),(0,r.jsx)($e.A,{width:"11rem",color:"secondary",filled:!1,rounded:!0,size:"sm",onClick:o,children:i})]}),rn=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,on=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`,nn=h.Ay.label`
  color: ${({theme:e})=>e.color.primary[800]};
  font-size: ${({theme:e})=>e.fontSize.lg};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,sn=({readonly:e=!1,id:t,title:i,subtitle:o,children:n})=>(0,r.jsxs)(rn,{children:[(0,r.jsxs)(on,{children:[(0,r.jsx)(nn,{htmlFor:t,children:i}),!e&&(0,r.jsx)(Yr,{description:`💡 ${o}`})]}),n]}),an=h.Ay.div`
  display: flex;
  flex-direction: column;

  position: relative;
`,ln=h.Ay.textarea`
  width: 100%;
  height: 20rem;
  min-height: 20rem;
  max-height: 40rem;
  padding: 2rem;
  border: 1px solid ${({theme:e})=>e.color.black[300]};
  border-radius: 0.5rem;

  background-color: ${({theme:e})=>e.color.black[50]};
  color: ${({theme:e})=>e.color.black[800]};
  font-size: ${({theme:e})=>e.fontSize.md};
  line-height: 1.6;
  resize: vertical;

  word-wrap: break-word;
  overflow-wrap: break-word;

  &:focus {
    border: 1px solid ${({theme:e})=>e.color.primary[700]};

    background-color: ${({theme:e})=>e.color.black[0]};
    color: ${({theme:e})=>e.color.black[900]};
  }

  &::placeholder {
    color: ${({theme:e})=>e.color.black[300]};
  }
`,cn=h.Ay.p`
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  padding: 0.5rem 1rem;
  border-radius: 1rem;

  background-color: ${({theme:e})=>e.color.black[50]};
  color: ${({theme:e})=>e.color.primary[700]};
  font-size: ${({theme:e})=>e.fontSize.sm};
`,dn=({id:e,charNumber:t,...i})=>(0,r.jsxs)(an,{children:[(0,r.jsx)(ln,{id:e,...i}),(0,r.jsx)(cn,{children:t})]}),mn=[{title:"자신의 의견 대신 페어의 의견을 수용한 적이 있나요?",subtitle:"그 과정에서 무엇을 배웠고, 어떤 것을 느꼈나요?",id:"1"},{title:"내 의견을 페어에게 효과적으로 설명하고 이해시켰나요?",subtitle:"의견 전달 과정에서 어려웠던 점은 무엇인가요?",id:"2"},{title:"상대방의 코드를 이해하지 못한 때가 있었나요?",subtitle:"질문을 통해 모르는 부분에 대해 소통했나요? 새롭게 배운 내용을 적어 주셔도 좋아요.",id:"3"},{title:"다음 페어 프로그래밍을 위해 내가 개선해야 할 점은 무엇인가요?",subtitle:"이번 페어 프로그래밍을 통해 아쉬웠던 점은 무엇이었나요? 혹은 다음 페어 프로그래밍에서 시도해 보고 싶은 것이 있나요?",id:"4"},{title:"페어 프로그래밍을 하면서 만족한 점이 있었나요?",subtitle:"다음 페어 프로그래밍 때도 이어나가고 싶은 점을 적어 주세요.",id:"5"},{title:"추가로 작성하고 싶은 내용이 있다면 자유롭게 작성해 주세요!",subtitle:"느낀 점, 배운 것들... 어떤 내용이든 괜찮아요.",id:"6"}],hn=h.Ay.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: calc(100vh - 7rem);

  background-color: ${({theme:e})=>e.color.primary[50]};
`,un=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  position: relative;

  width: 60%;
  min-width: 76.8rem;
  padding: 4rem 4rem 12rem;

  background-color: ${({theme:e})=>e.color.black[0]};

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    width: 100%;
    min-width: 0;
    padding: 4rem 4rem 12rem;
  }
`,pn=h.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  width: 100%;
`,fn=h.Ay.div`
  position: fixed;
  bottom: 0;
  left: 50%;

  width: 60%;
  min-width: 76.8rem;

  transform: translate(-50%);

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    width: 100%;
  }
`,gn=()=>{const e=(0,u.Zp)(),{accessCode:t}=(0,u.g)();(0,o.useEffect)((()=>{const e=e=>{e.preventDefault()};return window.addEventListener("beforeunload",e),()=>{window.removeEventListener("beforeunload",e)}}),[]);const{isModalOpen:i,openModal:n,closeModal:s}=(0,Fe.A)(),{answers:a,handleChange:l,handleSubmit:c}=(e=>{const t=(0,u.Zp)(),[i,r]=(0,o.useState)(Array(mn.length).fill("")),{addRetrospectMutation:n}=xr();return{answers:i,handleChange:(e,t)=>{if(t.length>1e3)return;const o=[...i];o[e]=t,r(o)},handleSubmit:async r=>{r.preventDefault(),n({accessCode:e,answers:i},{onSuccess:()=>t(`/room/${e}/completed`,{state:{valid:!0},replace:!0})})}}})(t||""),d=a.every((e=>!e.trim()));return(0,r.jsx)(hn,{children:(0,r.jsxs)(un,{children:[(0,r.jsx)(tn,{title:"회고 작성하기",subTitle:"지금까지 진행한 페어 프로그래밍에 대한 회고를 작성해 보세요!",buttonText:"나중에 작성하기",onButtonClick:n}),(0,r.jsxs)(pn,{onSubmit:c,children:[mn.map(((e,t)=>(0,r.jsx)(sn,{id:e.id,title:e.title,subtitle:e.subtitle,children:(0,r.jsx)(dn,{id:e.id,value:a[t],onChange:e=>l(t,e.target.value),placeholder:"질문에 대한 답변을 작성해주세요.",charNumber:`${a[t].length} / 1000`},e.id)},e.id))),(0,r.jsx)(fn,{children:(0,r.jsx)($e.A,{width:"100%",height:"5rem",borderRadius:"0",type:"submit",disabled:d,children:"작성 완료"})})]}),(0,r.jsx)(Ki.A,{title:"나중에 작성하시겠습니까?",subTitle:"작성된 내용이 모두 사라질 수 있어요.",isOpen:i,close:s,onConfirm:()=>e(`/room/${t}/completed`,{state:{valid:!0},replace:!0})})]})})},xn=h.Ay.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: calc(100vh - 7rem);

  background-color: ${({theme:e})=>e.color.primary[50]};
`,yn=h.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  position: relative;

  width: 60%;
  min-width: 76.8rem;
  padding: 4rem 4rem 12rem;

  background-color: ${({theme:e})=>e.color.black[0]};

  @media (max-width: ${({theme:e})=>e.deviceWidth.mobile}) {
    width: 100%;
    min-width: 0;
    padding: 4rem 4rem 12rem;
  }
`,bn=h.Ay.pre`
  overflow-y: auto;

  width: 100%;
  margin: 0;
  padding: 2rem;
  border: 1px solid ${({theme:e})=>e.color.black[300]};
  border-radius: 0.5rem;

  background-color: ${({theme:e})=>e.color.black[50]};
  color: ${({theme:e})=>e.color.black[800]};
  font-size: ${({theme:e})=>e.fontSize.md};
  font-weight: ${({theme:e})=>e.fontWeight.light};
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: 'Pretendard Variable', sans-serif !important;
`,$n=()=>{const{accessCode:e}=(0,u.g)(),t=(0,u.Zp)(),{answers:i,isFetching:o}=(e=>{const{data:t,isFetching:i}=(0,De.I)({queryKey:[Ge.e.GET_RETROSPECT_ANSWER],queryFn:()=>(async e=>{const t=await g.A.get({url:`undefined/retrospects/${e}`,errorMessage:x.U.GET_RETROSPECT});return await t.json()})(e),retry:!1});return{answers:t?.answers||[],isFetching:i}})(e||"");return o?(0,r.jsx)(p.A,{size:"sm"}):(0,r.jsx)(xn,{children:(0,r.jsxs)(yn,{children:[(0,r.jsx)(tn,{title:e||"",subTitle:`${e}에서 작성한 회고입니다!`,buttonText:"페어룸으로 이동",onButtonClick:()=>t(`/room/${e}/completed`,{state:{valid:!0},replace:!0})}),mn.map(((e,t)=>(0,r.jsx)(sn,{readonly:!0,id:e.id,title:e.title,subtitle:e.subtitle,children:(0,r.jsx)(bn,{children:i[t]})},e.id)))]})})},vn=h.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;

  height: calc(100vh - 7rem);
  padding: 15rem 5rem;

  background-color: ${({theme:e})=>e.color.black[50]};
`,wn=h.Ay.img`
  width: 30rem;
  max-width: 40rem;
`,jn=h.Ay.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.6rem;
`,An=h.Ay.h1`
  color: ${({theme:e})=>e.color.primary[900]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.medium};
`,Sn=()=>{const e=(0,u.Zp)(),{userStatus:t}=(0,f.A)();(0,o.useEffect)((()=>{"SIGNED_IN"===t&&e("/main",{replace:!0})}),[t]);const{value:i,status:n,message:s,handleChange:a}=(0,Di.A)(),{handleSignUp:l}=(()=>{const e=(0,u.Zp)(),{setUser:t}=(0,f.A)();return{handleSignUp:async i=>{await(async e=>{const t=await g.A.post({url:"undefined/sign-up",body:JSON.stringify({username:e}),errorMessage:x.U.SIGN_UP});return await t.json()})(i),t(i,"SIGNED_IN"),e("/main")}}})();return(0,r.jsxs)(vn,{children:[(0,r.jsx)(wn,{src:le.Xo,alt:"logo_icon_with_title"}),(0,r.jsxs)(jn,{onSubmit:e=>{e.preventDefault(),l(i)},children:[(0,r.jsx)(An,{children:"첫 방문이시네요! 당신을 어떻게 불러야 할까요?"}),(0,r.jsxs)(Fi.F,{children:[(0,r.jsx)(Fi.F.Input,{value:i,status:n,width:"50rem",title:"이름(또는 닉네임)",placeholder:"이름(또는 닉네임)을 입력해주세요.",onChange:e=>{a(e,ho(e.target.value))}}),(0,r.jsx)(Fi.F.Message,{status:n,children:s})]}),(0,r.jsx)($e.A,{width:"50rem",height:"10rem",fontSize:ve.w.fontSize.md,type:"submit",disabled:"ERROR"===ho(i).status,children:"계정 만들기 🥳"})]})]})},En=h.DU`
    /*
    Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
    - The "symbol *" part is to solve Firefox SVG sprite bug
    - The "html" element is excluded, otherwise a bug in Chrome breaks the CSS hyphens property (https://github.com/elad2412/the-new-css-reset/issues/36)
    */
    *:where(:not(html, iframe, canvas, img, svg, video, audio, svg *, symbol *)) {
        all: unset;

        display: revert;
    }

    /* Preferred box-sizing value */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* Fix mobile Safari increase font-size on landscape mode */
    html {
        text-size-adjust: none;
    }

    /* Reapply the pointer cursor for anchor tags */
    a,
    button {
        cursor: revert;
    }

    /* Remove list styles (bullets/numbers) */
    ol,
    ul,
    menu,
    summary {
        list-style: none;
    }

    /* For images to not be able to exceed their container */
    img {
        max-inline-size: 100%;
        max-block-size: 100%;
    }

    /* Removes spacing between cells in tables */
    table {
        border-collapse: collapse;
    }

    /* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
    input,
    textarea {
        user-select: auto;
    }

    /* Revert the 'white-space' property for textarea elements on Safari */
    textarea {
        white-space: revert;
    }

    /* Minimum style to allow to style meter element */
    meter {
        appearance: revert;
    }

    /* Preformatted text - use only for this feature */
    :where(pre) {
        all: revert;
        box-sizing: border-box;
    }

    /* Fix the feature of 'hidden' attribute.
       display: revert; revert to element instead of attribute */
    :where([hidden]) {
        display: none;
    }

    /* Revert for bug in Chromium browsers
       - Fix for the content editable attribute will work properly.
       - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element */
    :where([contenteditable]:not([contenteditable='false'])) {
        -moz-user-modify: read-write;
        -webkit-user-modify: read-write;
        overflow-wrap: break-word;
        line-break: after-white-space;
        user-select: auto;
    }

    /* Apply back the draggable feature - exist only in Chromium and Safari */
    :where([draggable='true']) {
        -webkit-user-drag: element;
    }

    /* Revert Modal native behavior */
    :where(dialog:modal) {
        all: revert;
        box-sizing: border-box;
    }

    /* Remove details summary webkit styles */
    ::-webkit-details-marker {
        display: none;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    appearance: none;

    margin: 0;
    }

    /* Firefox  */
    input[type='number'] {
    appearance: textfield;
    }
`,kn=(0,o.lazy)((()=>Promise.all([i.e(714),i.e(597)]).then(i.bind(i,1597)))),Rn=new d.E;var zn=i(2691),On=i.n(zn),Tn=i(7825),Cn=i.n(Tn),_n=i(7659),In=i.n(_n),Nn=i(5056),Mn=i.n(Nn),Fn=i(540),Pn=i.n(Fn),Dn=i(1113),Un=i.n(Dn),Gn=i(9497),Wn={};Wn.styleTagTransform=Un(),Wn.setAttributes=Mn(),Wn.insert=In().bind(null,"head"),Wn.domAPI=Cn(),Wn.insertStyleElement=Pn(),On()(Gn.A,Wn),Gn.A&&Gn.A.locals&&Gn.A.locals,n.T({dsn:void 0,integrations:[s.dp(),a.w()],tracesSampleRate:1,tracePropagationTargets:["localhost:3001","https://coduo.site",/^\/api\//],replaysSessionSampleRate:.1,replaysOnErrorSampleRate:1}),l.createRoot(document.getElementById("root")).render((0,r.jsx)(o.StrictMode,{children:(0,r.jsx)((()=>{const{setUser:e}=(0,f.A)();(0,o.useEffect)((()=>{"/callback"!==window.location.pathname&&(async()=>{const{signedIn:t}=await(async()=>{const e=await g.A.get({url:"undefined/sign-in/check",errorMessage:x.U.CHECK_USER_LOGIN});return await e.json()})();if(!t)return void e("","SIGNED_OUT");const{username:i}=await y();e(i,"SIGNED_IN")})()}),[]);const t=(0,c.Ys)([{path:"/",element:(0,r.jsx)(Ei,{}),errorElement:(0,r.jsx)(kt,{}),children:[{path:"",element:(0,r.jsx)(ri,{})},{path:"main",element:(0,r.jsx)(Yi,{})},{path:"how-to-pair",element:(0,r.jsx)(Jt,{})},{path:"onboarding",element:(0,r.jsx)(Vo,{})},{path:"room",element:(0,r.jsx)(Xo,{}),children:[{path:":accessCode",element:(0,r.jsx)(o.Suspense,{fallback:(0,r.jsx)(ce.A,{}),children:(0,r.jsx)(kn,{})})},{path:":accessCode/completed",element:(0,r.jsx)(o.Suspense,{fallback:(0,r.jsx)(ce.A,{}),children:(0,r.jsx)(wt,{})})},{path:":accessCode/retrospect",element:(0,r.jsx)(o.Suspense,{fallback:(0,r.jsx)(ce.A,{}),children:(0,r.jsx)($n,{})})},{path:":accessCode/retrospectForm",element:(0,r.jsx)(o.Suspense,{fallback:(0,r.jsx)(ce.A,{}),children:(0,r.jsx)(gn,{})})}]},{path:"sign-up",element:(0,r.jsx)(Sn,{})},{path:"coduo-docs",element:(0,r.jsx)(ae,{})},{path:"callback",element:(0,r.jsx)(S,{})},{path:"my-page",element:(0,r.jsx)(kr,{})},{path:"error",element:(0,r.jsx)(kt,{})},{path:"*",element:(0,r.jsx)(kt,{})}]}]);return(0,r.jsx)(m.Ht,{client:Rn,children:(0,r.jsxs)(h.NP,{theme:ve.w,children:[(0,r.jsx)(En,{}),(0,r.jsx)(c.pg,{router:t})]})})}),{})}))},7418:(e,t,i)=>{i.d(t,{A:()=>l});var r=i(4848),o=i(131),n=i(7581);const s=n.Ay.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  height: calc(100vh - 7rem);
  padding: 20px;

  background-color: ${({theme:e})=>e.color.black[50]};
`,a=n.Ay.h1`
  margin-bottom: 2rem;

  color: ${({theme:e})=>e.color.primary[900]};
  font-size: ${({theme:e})=>e.fontSize.h5};
  font-weight: ${({theme:e})=>e.fontWeight.light};
`,l=()=>(0,r.jsxs)(s,{children:[(0,r.jsx)(a,{children:"페이지를 불러오는 중입니다. 잠시만 기다려 주세요 ☺️"}),(0,r.jsx)(o.A,{size:"md"})]})},4010:(e,t,i)=>{i.d(t,{Ay:()=>c,vz:()=>a,zb:()=>s});var r=i(9270),o=i(4994),n=i(5778);const s="0",a="전체",l={id:s,value:a},c=e=>{const{data:t}=(0,r.I)({queryKey:[n.e.GET_CATEGORIES],queryFn:()=>(0,o.bW)(e),retry:!1});return{categories:[l,...t||[]],isCategoryExist:e=>!!t&&t.map((e=>e.value)).includes(e)}}},4700:(e,t,i)=>{i.d(t,{A:()=>l});var r=i(7665),o=i(7097),n=i(1711),s=i(1185),a=i(5778);const l=()=>{const e=(0,r.jE)(),{addToast:t}=(0,n.A)(),{mutate:i}=(0,o.n)({mutationFn:s.FZ,onError:e=>t({status:"ERROR",message:e.message})}),{mutate:l}=(0,o.n)({mutationFn:s.gJ,onSuccess:()=>e.invalidateQueries({queryKey:[a.e.GET_PAIR_ROOM]}),onError:e=>t({status:"ERROR",message:e.message})}),{mutate:c}=(0,o.n)({mutationFn:s.Fu,onSuccess:()=>t({status:"SUCCESS",message:"페어 프로그래밍이 완료되었습니다."}),onError:e=>t({status:"ERROR",message:e.message})}),{mutate:d,isPending:m}=(0,o.n)({mutationFn:s.LX,onSuccess:()=>(t({status:"SUCCESS",message:"페어룸이 삭제되었습니다."}),e.invalidateQueries({queryKey:[a.e.GET_MY_PAIR_ROOMS]})),onError:()=>t({status:"ERROR",message:"페어룸 삭제에 실패했습니다."})});return{addPairRoomMutation:i,updatePairRoleMutation:l,updatePairRoomStatusMutation:c,deletePairRoomMutation:d,isDeletePairRoomPending:m}}},3795:(e,t,i)=>{i.d(t,{A:()=>l});var r=i(6540),o=i(7665),n=i(9270),s=i(1185),a=i(5778);const l=e=>{const t=(0,o.jE)(),{data:i,isFetching:l,isRefetching:c}=(0,n.I)({queryKey:[a.e.GET_PAIR_ROOM,e],queryFn:()=>(0,s.E7)(e),refetchOnWindowFocus:!1});return(0,r.useEffect)((()=>{t.invalidateQueries({queryKey:[a.e.GET_PAIR_ROOM,a.e.GET_PAIR_ROOM_TIMER]})}),[e]),{driver:i?.driver||"",navigator:i?.navigator||"",status:i?.status||"",missionUrl:i?.missionUrl||"",duration:i?.duration||0,remainingTime:i?.remainingTime||0,isFetching:l&&!c,todos:i?.todos||[],references:i?.references||[]}}},1711:(e,t,i)=>{i.d(t,{A:()=>r});const r=(0,i(1621).vt)((e=>({toastList:[],addToast:t=>{const i=Date.now(),r={...t,id:i,isOpen:!0,isPush:!1};e((e=>({toastList:[r,...e.toastList.map((e=>({...e,isPush:!0})))].slice(0,3)}))),setTimeout((()=>{e((e=>({toastList:e.toastList.map((e=>e.id===i?{...e,isOpen:!1}:e))}))),setTimeout((()=>{e((e=>({toastList:e.toastList.filter((e=>e.id!==i))})))}),750)}),3e3)}})))},4703:(e,t,i)=>{i.d(t,{A:()=>r});const r=(0,i(1621).vt)((e=>({username:"",userStatus:"SIGNED_OUT",setUser:(t,i)=>e((()=>({username:t,userStatus:i}))),resetUser:()=>e((()=>({username:"",userStatus:"SIGNED_OUT"})))})))},7594:(e,t,i)=>{i.d(t,{w:()=>r});const r={color:{primary:{50:"#F1FBFA",100:"#CFFFFA",200:"#A0FFF5",300:"#70FFF0",400:"#40FFEB",500:"#11FFE5",600:"#00E0C8",700:"#00B8A5",800:"#0094A0",900:"#00506B"},secondary:{50:"#FFF8DC",100:"#FFF0D4",200:"#FFE1A9",300:"#FFD37E",400:"#FFC453",500:"#FFB526",600:"#F9A300",700:"#CC8600",800:"#9F6900",900:"#734B00"},success:{10:"#f9fef1",50:"#f4fce8",100:"#eaf8d5",200:"#d5f2ac",300:"#c0eb82",400:"#aae558",500:"#95de2f",600:"#7cbf1e",700:"#669d19",800:"#507b13",900:"#3a5a0e"},info:{50:"#e0eaff",100:"#c9d8ff",200:"#94b0ff",300:"#5e89ff",400:"#366bff",500:"#0d4eff",600:"#003de4",700:"#0032bb",800:"#002793",900:"#001c6a"},warning:{50:"#fff9e5",100:"#fff4cc",200:"#ffe999",300:"#ffdd66",400:"#ffd233",500:"#ffc700",600:"#d9a900",700:"#b38b00",800:"#8c6d00",900:"#665000"},danger:{10:"#fff1ec",50:"#ffe7e1",100:"#ffded5",200:"#ffbeaa",300:"#ff9e80",400:"#ff7d56",500:"#ff5f2f",600:"#ff4007",700:"#df3300",800:"#b72a00",900:"#902100"},black:{0:"#ffffff",50:"#f5f5f5",100:"#eeeeee",200:"#e5e5e5",300:"#cccccc",400:"#9f9f9f",500:"#808080",600:"#606060",700:"#404040",800:"#202020",900:"#000000"}},fontSize:{h1:"4.8rem",h2:"4.0rem",h3:"3.2rem",h4:"2.8rem",h5:"2.4rem",h6:"2.0rem",lg:"1.8rem",base:"1.6rem",md:"1.4rem",sm:"1.2rem",xs:"1.0rem"},fontWeight:{thin:"100",extraLight:"200",light:"300",normal:"400",medium:"500",semibold:"600",bold:"700",extraBold:"800",black:"900"},deviceWidth:{mobile:"768px"},iconSize:{sm:"1.6rem",md:"2rem",lg:"2.4rem",xl:"2.8rem"},iconButtonSize:{sm:"2.4rem",md:"3rem",lg:"3.6rem",xl:"4.2rem"}}},519:(e,t,i)=>{i.d(t,{w:()=>a});var r=i(7581),o=i(7594);const n=(e,t,i)=>Math.min(Math.max(e,t),i),s=(e,t)=>{const i=e.slice(1),r=parseInt(i,16);let o=(r>>16)+t,s=(r>>8&255)+t,a=(255&r)+t;return o=n(o,0,255),s=n(s,0,255),a=n(a,0,255),`#${(o<<16|s<<8|a).toString(16).padStart(6,"0")}`},a=(e,t)=>{const i=e in o.w.color,n=i?e:null,a=(e,t)=>{const r=o.w.color[n];return i?r[e]:t},l="#"+("000000"+(e=>{const t=16777215,i=parseInt(e.slice(1,8),16);return i<0?0:i>t?t:i})(e).toString(16)).slice(-6),c=(e=>{const t=e.slice(1),i=[parseInt(t.substring(0,2),16)/255,parseInt(t.substring(2,4),16)/255,parseInt(t.substring(4,6),16)/255].map((e=>e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4)));return.2126*i[0]+.7152*i[1]+.0722*i[2]})(l),d=c>.5?-1:1,m=c>.8||c<.2?40:20,h=s(l,d*m),u=s(h,d*m);return{base:r.AH`
      border-color: ${a("primary"===n?600:400,l)};

      background-color: ${t?a("primary"===n?600:400,l):o.w.color.black[0]};
      color: ${t?o.w.color.black[0]:a("primary"===n?600:400,l)};
    `,hover:r.AH`
      border-color: ${a("primary"===n?700:500,h)};

      background-color: ${t?a("primary"===n?700:500,h):o.w.color.black[0]};
      color: ${t?o.w.color.black[0]:a("primary"===n?700:500,h)};
    `,active:r.AH`
      border-color: ${a("primary"===n?800:600,u)};

      background-color: ${t?a("primary"===n?800:600,u):o.w.color.black[0]};
      color: ${t?o.w.color.black[0]:a("primary"===n?800:600,u)};
    `,disabled:r.AH`
      border-color: ${o.w.color.black[300]};

      background-color: ${o.w.color.black[300]};
      color: ${o.w.color.black[0]};
    `}}},8198:(e,t,i)=>{i.d(t,{r:()=>r});const r=(e,t)=>e.find((e=>e.id===t))?.value||null},5260:(e,t,i)=>{i.d(t,{W:()=>r});const r=e=>!!Number.isInteger(Number(e))&&!(Number(e)<=0||Number(e)>=100)}},s={};function a(e){var t=s[e];if(void 0!==t)return t.exports;var i=s[e]={id:e,exports:{}};return n[e](i,i.exports,a),i.exports}a.m=n,e=[],a.O=(t,i,r,o)=>{if(!i){var n=1/0;for(d=0;d<e.length;d++){for(var[i,r,o]=e[d],s=!0,l=0;l<i.length;l++)(!1&o||n>=o)&&Object.keys(a.O).every((e=>a.O[e](i[l])))?i.splice(l--,1):(s=!1,o<n&&(n=o));if(s){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[i,r,o]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},i=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var o=Object.create(null);a.r(o);var n={};t=t||[null,i({}),i([]),i(i)];for(var s=2&r&&e;"object"==typeof s&&!~t.indexOf(s);s=i(s))Object.getOwnPropertyNames(s).forEach((t=>n[t]=()=>e[t]));return n.default=()=>e,a.d(o,n),o},a.d=(e,t)=>{for(var i in t)a.o(t,i)&&!a.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,i)=>(a.f[i](e,t),t)),[])),a.u=e=>e+".js",a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},o="coduo-frontend:",a.l=(e,t,i,n)=>{if(r[e])r[e].push(t);else{var s,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var m=c[d];if(m.getAttribute("src")==e||m.getAttribute("data-webpack")==o+i){s=m;break}}s||(l=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,a.nc&&s.setAttribute("nonce",a.nc),s.setAttribute("data-webpack",o+i),s.src=e),r[e]=[t];var h=(t,i)=>{s.onerror=s.onload=null,clearTimeout(u);var o=r[e];if(delete r[e],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(i))),t)return t(i)},u=setTimeout(h.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=h.bind(null,s.onerror),s.onload=h.bind(null,s.onload),l&&document.head.appendChild(s)}},a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.p="/",(()=>{var e={792:0};a.f.j=(t,i)=>{var r=a.o(e,t)?e[t]:void 0;if(0!==r)if(r)i.push(r[2]);else{var o=new Promise(((i,o)=>r=e[t]=[i,o]));i.push(r[2]=o);var n=a.p+a.u(t),s=new Error;a.l(n,(i=>{if(a.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=i&&("load"===i.type?"missing":i.type),n=i&&i.target&&i.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+n+")",s.name="ChunkLoadError",s.type=o,s.request=n,r[1](s)}}),"chunk-"+t,t)}},a.O.j=t=>0===e[t];var t=(t,i)=>{var r,o,[n,s,l]=i,c=0;if(n.some((t=>0!==e[t]))){for(r in s)a.o(s,r)&&(a.m[r]=s[r]);if(l)var d=l(a)}for(t&&t(i);c<n.length;c++)o=n[c],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(d)},i=self.webpackChunkcoduo_frontend=self.webpackChunkcoduo_frontend||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})(),a.nc=void 0;var l=a.O(void 0,[903],(()=>a(8215)));l=a.O(l)})();
//# sourceMappingURL=main.js.map