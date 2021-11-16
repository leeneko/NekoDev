(function(){"use strict";const{ipcRenderer:o,webFrame:s,contextBridge:a}=require("electron");function t(e){if(!e||!e.startsWith("vscode:"))throw new Error(`Unsupported event IPC channel '${e}'`);return!0}function f(e){if(e!=="uncaughtException")throw new Error(`Unsupported process event '${e}'`);return!0}function d(e){for(const r of process.argv)if(r.indexOf(`--${e}=`)===0)return r.split("=")[1]}let n;const i=(async()=>{const e=d("vscode-window-config");if(!e)throw new Error("Preload: did not find expected vscode-window-config in renderer process arguments list.");try{if(t(e))return n=await o.invoke(e),Object.assign(process.env,n.userEnv),s.setZoomLevel(n.zoomLevel??0),n}catch(r){throw new Error(`Preload: unable to fetch vscode-window-config: ${r}`)}})(),v=(async()=>{const[e,r]=await Promise.all([(async()=>(await i).userEnv)(),o.invoke("vscode:fetchShellEnv")]);return{...process.env,...r,...e}})(),c={ipcRenderer:{send(e,...r){t(e)&&o.send(e,...r)},invoke(e,...r){if(t(e))return o.invoke(e,...r)},on(e,r){if(t(e))return o.on(e,r),this},once(e,r){if(t(e))return o.once(e,r),this},removeListener(e,r){if(t(e))return o.removeListener(e,r),this}},ipcMessagePort:{acquire(e,r){if(t(e)){const u=(p,g)=>{r===g&&(o.off(e,u),window.postMessage(r,"*",p.ports))};o.on(e,u)}}},webFrame:{setZoomLevel(e){typeof e=="number"&&s.setZoomLevel(e)}},process:{get platform(){return process.platform},get arch(){return process.arch},get env(){return{...process.env}},get versions(){return process.versions},get type(){return"renderer"},get execPath(){return process.execPath},get sandboxed(){return process.sandboxed},cwd(){return process.env.VSCODE_CWD||process.execPath.substr(0,process.execPath.lastIndexOf(process.platform==="win32"?"\\":"/"))},shellEnv(){return v},getProcessMemoryInfo(){return process.getProcessMemoryInfo()},on(e,r){if(f(e))return process.on(e,r),this}},context:{configuration(){return n},async resolveConfiguration(){return i}}};if(process.contextIsolated)try{a.exposeInMainWorld("vscode",c)}catch(e){console.error(e)}else window.vscode=c})();

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/3a6960b964327f0e3882ce18fcebd07ed191b316/core/vs/base/parts/sandbox/electron-browser/preload.js.map
