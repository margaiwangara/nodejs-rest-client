(this.webpackJsonpnodejsrestclient=this.webpackJsonpnodejsrestclient||[]).push([[14],{166:function(e,t,a){"use strict";a.d(t,"c",(function(){return c})),a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return r}));var c={height:"100vh",width:"100%",boxSizing:"border-box"},n={position:"absolute",right:0,padding:"0.375rem 0.75rem",cursor:"pointer"},r={position:"absolute",height:"50px",width:"50px",right:0,bottom:0,display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}},225:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),r=a(2),i=a(57),o=a(56),s=a(166),l=a(60),m=a(167),u=a(180);t.default=function(){var e=Object(r.g)(),t=Object(o.b)(),a=Object(o.c)((function(e){return e.user})).user,c="no-image.jpg"===a.profileImage?"https://i.pravatar.cc/150?u=".concat(a.email):"".concat(u.a,"/uploads/").concat(a.profileImage);return n.a.createElement("div",{className:"card w-100"},n.a.createElement("div",{className:"card-body text-center"},n.a.createElement("div",{className:"image-area d-flex justify-content-center"},n.a.createElement("figure",{className:"m-0",style:{height:"150px",width:"150px",position:"relative"}},n.a.createElement(i.b,{to:"/edit-profile-picture",style:s.b,className:"rounded-circle bg-primary"},n.a.createElement(l.a,{icon:"pencil-alt",color:"#ffffff",style:{fontSize:"20px"}})),n.a.createElement("img",{src:c,alt:"portrait",className:"w-100 h-100 rounded-circle",style:{objectFit:"cover"}}))),n.a.createElement("h3",{className:"text-center mt-3"},a.name," ",a.surname),n.a.createElement("p",null,a.email),n.a.createElement("hr",null),n.a.createElement("div",{className:"list-group"},n.a.createElement(i.c,{activeClassName:"active",to:"/",exact:!0,className:"list-group-item list-group-item-action"},"Dashboard"),n.a.createElement(i.c,{activeClassName:"active",to:"/edit-profile",className:"list-group-item list-group-item-action"},"Edit Profile"),n.a.createElement(i.c,{activeClassName:"active",to:"/change-password",className:"list-group-item list-group-item-action"},"Change Password")),n.a.createElement("hr",null),n.a.createElement("button",{className:"btn btn-danger btn-block",onClick:function(a){console.log("Signed Out"),Object(m.e)(t).then((function(){return e.push("/login")}))}},"Logout")))}}}]);
//# sourceMappingURL=14.ddb89b63.chunk.js.map