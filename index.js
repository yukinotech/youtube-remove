// ==UserScript==
// @name         油管去掉推荐
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

;(function () {
  "use strict"
  const findChildNodesHasAdBlockText = (arrayLike) => {
    if (arrayLike?.length) {
      for (let i = 0; i < arrayLike.length; i++) {
        // console.log("arrayLike", arrayLike)
        if (arrayLike[i]?.childNodes?.length) {
          if (findChildNodesHasAdBlockText(arrayLike[i].childNodes)) {
            return true
          }
        }
        if (
          typeof arrayLike[i]?.data === "string" &&
          arrayLike[i].data.indexOf("广告拦截器") !== -1
        ) {
          return true
        }
      }
    } else {
      if (
        typeof arrayLike?.data === "string" &&
        arrayLike.data.indexOf("广告拦截器") !== -1
      ) {
        return true
      }
    }
  }
  setInterval(() => {
    const nodeList = document.querySelectorAll(".ytp-ce-element")
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i]?.remove?.()
    }

    const tpYtPaperDialogList =
      document.getElementsByTagName("tp-yt-paper-dialog")
    const dialogHasAd = findChildNodesHasAdBlockText(tpYtPaperDialogList)

    if (dialogHasAd) {
      for (let i = 0; i < tpYtPaperDialogList.length; i++) {
        tpYtPaperDialogList[i]?.setAttribute("style", "display:none")
      }
      // tp-yt-iron-overlay-backdrop

      const modalList = document.getElementsByTagName(
        "tp-yt-iron-overlay-backdrop"
      )
      for (let i = 0; i < modalList.length; i++) {
        modalList[i]?.setAttribute("style", "display:none")
      }
    }

    console.log("t4", dialogHasAd)
    // document.getElementsByTagName("tp-yt-paper-dialog")[0].childNodes[1]
    //   .childNodes[2].childNodes[7].childNodes[5].childNodes[1].childNodes[0]
    //   .childNodes[0].childNodes[0]
    // console.log("test1")
  }, 1000)

  // Your code here...
})()
