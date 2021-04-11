<!-- eslint-disable max-len -->
<template>
  <div class="h-screen w-screen bg-gray-200 flex flex-col flex-no-wrap overflow-none">
    <div id="navigation">
        <div id="leftside">
            <div id="details" class="p-4">
              <div id="names">
                  <p id="title">Boto</p>
                  <p id="subtitle">Smart automation</p>
              </div>
          </div>
        </div>
        <div id="centerswitch">
            <div id="leftswitch">Diagram</div>
            <div id="rightswitch">Code</div>
        </div>
        <div id="buttonsright">
            <div id="discard" @click="deleteBlocks">Discard</div>
            <div id="publish" @click="openMetamask">Deploy</div>
        </div>
    </div>
    <div id="leftcard">
        <p id="header">Blocks</p>
        <div id="search">
            <img src="assets/search.svg">
            <input type="text" placeholder="Search blocks">
        </div>
        <div id="subnav">
            <div id="triggers" class="navactive side">Blocks</div>
            <div id="actions" class="navdisabled side">Market Place</div>
        </div>
        <div id="blocklist">
            <div class="mt-3">
              <flowy-new-block
                v-for="(block, index) in blocks"
                :key="index"
                @drag-start="onDragStartNewBlock"
                @drag-stop="onDragStopNewBlock"
              >
                <template v-slot:preview="{}">
                  <block
                    :title="block.preview.title"
                    :description="block.preview.description"
                    :icon="block.preview.icon"
                  />
                </template>
                <template v-slot:node="{}">
                  <node
                    :title="block.node.title"
                    :description="block.node.description"
                    :icon="block.node.icon"
                    :custom-prop="block.node.canBeDragged"
                  />
                </template>
              </flowy-new-block>
            </div>
        </div>
        <div id="footer">
            <a href="https://github.com/xxx" target="_blank">GitHub Repo</a>
            <span>·</span>
            Chainlink Hackathon 2021
        </div>
    </div>
    <div id="canvas" v-if="step === 0">
      <div class="flex-grow overflow-auto">
        <flowy
          class="h-full w-full p-6"
          :nodes="nodes"
          @drag-start="onDragStart"
          @add="add"
          @move="move"
          @remove="remove"
          :beforeAdd="beforeAdd"
          :beforeMove="beforeMove"
          :onEnterDragFn="onEnter"
        ></flowy>
      </div>
    </div>
    <div class="overflow-x-auto ml-6 p-4" style="margin: 60px 0 0 360px" v-if="step === 1">
      <div class="flex items-center font-sans overflow-hidden">
        <div class="w-full">
          <div class="bg-white shadow-md rounded my-6">
            <table class="min-w-max w-full table-auto">
                <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">Job</th>
                        <th class="py-3 px-6 text-left">Type</th>
                        <th class="py-3 px-6 text-center">Status</th>
                        <th class="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          <div class="flex items-center">
                              <div class="mr-2">
                                <img width="20" style="opacity: 0.3" src="/assets/clipboard.png" />
                              </div>
                              <span class="font-medium">JOB0001</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                            <div class="flex items-center">
                                <span>BTC Loan with Repayment</span>
                            </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <span class="bg-green-200 text-purple-600 py-1 px-3 rounded-full text-xs">Live</span>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center">
                                <div @click="showJobLog" class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                            </div>
                        </td>
                    </tr>
                  </tbody>
                </table>
                <div class="bg-white shadow-md rounded my-6 p-4" v-if="showJobDetails">
                  <div><span class="font-semibold">Job initiatied</span> on <span class="font-medium">25th Apr 2021, 15:43 GMT</span></div>
                  <div v-if="jobStep1" class="mt-2 text-blue-400"><span class="font-semibold">Take Loan</span> action executed on <span class="font-medium">25th Apr 2021, 16:43 GMT</span></div>
                  <div v-if="jobStep2" class="mt-2 text-blue-400"><span class="font-semibold">Repay Loan</span> action executed on <span class="font-medium">25th Apr 2021, 17:21 GMT</span></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import findIndex from 'lodash/findIndex';
import generateId from './lib/generateId';
import nodes from './demo_data/simple';
import blocks from './demo_data/sampleBlocks';

export default {
  name: 'app',
  components: {

  },
  data: () => ({
    holder: [],
    dragging: false,
    blocks,
    nodes,
    newDraggingBlock: null,
    step: 0,
    showJobDetails: false,
    jobStep1: false,
    jobStep2: false,
  }),
  methods: {
    onDragStartNewBlock(event) {
      console.log('onDragStartNewBlock', event);
      this.newDraggingBlock = event;
    },
    onDragStopNewBlock(event) {
      console.log('onDragStopNewBlock', event);
      this.newDraggingBlock = null;
    },
    onDropBlock() {
    },
    beforeAdd() {
      return true;
    },
    afterAdd() {

    },
    onEnterDrop() {
      return true;
    },
    beforeMove({ to, from }) {
      console.log(to, from);
      if (from && from.id === '1') {
        return false;
      }
      return true;
    },
    onEnter() {

    },
    addNode(_event) {
      console.log('add node');
      const id = this.generateId();
      this.nodes.push({
        ..._event.node,
        id,
      });
    },
    remove(event) {
      const nodeIndex = findIndex(this.nodes, { id: event.node.id });
      this.nodes.splice(nodeIndex, 1);
    },
    move(event) {
      console.log('move', event);
      const { dragged, to } = event;
      dragged.parentId = to.id;
    },
    add(event) {
      const id = generateId();
      this.nodes.push({
        id,
        ...event.node,
      });
    },
    deleteBlocks() {
      this.nodes = [
        {
          id: '1',
          parentId: -1,
          nodeComponent: 'node',
          data: {
            width: 420,
            text: 'Parent block',
            title: 'JOB00001',
            description: 'Execute <span class="font-bold">once</span>',
            icon: 'eyeblue',
          },
        },
      ];
    },
    showJobLog() {
      this.showJobDetails = !this.showJobDetails;
      setTimeout(() => {
        this.jobStep1 = true;
        setTimeout(() => {
          this.jobStep2 = true;
        }, 3000);
      }, 2000);
    },
    openMetamask() {
      console.log('window.ethereum', window.ethereum);
      const params = [
        {
          from: '0x3D731445A255dBEdFC2d0B995538CC8bBd30c8f0',
          to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
          gas: '0x76c0', // 30400
          gasPrice: '0x9184e72a000', // 10000000000000
          value: '0x9184e72a', // 2441406250
          data:
            '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
        },
      ];
      window.ethereum.request({
        method: 'eth_sendTransaction',
        params,
      })
        .then((result) => {
          this.step = 1;
          console.log('result', result);
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
    onDragStart(event) {
      console.log('onDragStart', event);
      this.dragging = true;
    },
  },
  watch: {

  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto:100&display=swap");
html,
body {
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  color: #333;
  letter-spacing: 1px;
  background: #f5f5f5;
  font-weight: 300;
}

div {
  position: relative;
  z-index: 0;
}

.no-wrap {
  white-space: nowrap;
}

h1 {
  margin: 0;
}

.dropzone {
  width: 100px;
  height: 100px;
  border: 1px dotted black;
}

.flowy-drag-handle {
  cursor: grab;
}

a {
  text-decoration: none;
  color: #333;
}

.page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.page:nth-child(2n) {
  background: #f0f0f0;
}
.page.main {
  z-index: 1;
  min-height: 700px;
}

.side {
  width: 340px;
  height: 100%;
}

.container {
  height: 100%;
  position: relative;
  width: auto;
  margin: auto;
}

.description {
  text-align: center;
}

.example-block {
  width: 420px;
}

.flowy-block.draggable-mirror {
  opacity: 0.6;
}

#navigation {
    height: 71px;
    background-color: #FFF;
    border: 1px solid #E8E8EF;
    width: 100%;
    display: table;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    z-index: 9
}

#names {
    display: inline-block;
    vertical-align: top;
}
#title {
    font-family: Roboto;
    font-weight: 500;
    font-size: 16px;
    color: #393C44;
    margin-bottom: 0px;
}
#subtitle {
    font-family: Roboto;
    color: #808292;
    font-size: 14px;
    margin-top: 5px;
}
#leftside {
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
}
#centerswitch {
    position: absolute;
    width: 222px;
    left: 50%;
    margin-left: -111px;
    top: 15px;
}
#leftswitch {
    border: 1px solid #E8E8EF;
    background-color: #FBFBFB;
    width: 111px;
    height: 39px;
    line-height: 39px;
    border-radius: 5px 0px 0px 5px;
    font-family: Roboto;
    color: #393C44;
    display: inline-block;
    font-size: 14px;
    text-align: center;
}
#rightswitch {
    font-family: Roboto;
    color: #808292;
    border-radius: 0px 5px 5px 0px;
    border: 1px solid #E8E8EF;
    height: 39px;
    width: 102px;
    display: inline-block;
    font-size: 14px;
    line-height: 39px;
    text-align: center;
    margin-left: -1px;
}
#discard {
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    color: #A6A6B3;
    width: 95px;
    height: 38px;
    border: 1px solid #E8E8EF;
    border-radius: 5px;
    text-align: center;
    line-height: 38px;
    display: inline-block;
    vertical-align: top;
    transition: all .2s cubic-bezier(.05,.03,.35,1);
}
#discard:hover {
    cursor: pointer;
    opacity: .7;
}
#publish {
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    color: #FFF;
    background-color: #217CE8;
    border-radius: 5px;
    width: 143px;
    height: 38px;
    margin-left: 10px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    line-height: 38px;
    margin-right: 20px;
    transition: all .2s cubic-bezier(.05,.03,.35,1);
}
#publish:hover {
    cursor: pointer;
    opacity: .7;
}
#buttonsright {
    float: right;
    margin-top: 15px;
}
#leftcard {
    width: 363px;
    background-color: #FFF;
    border: 1px solid #E8E8EF;
    box-sizing: border-box;
    padding-top: 85px;
    padding-left: 20px;
    height: 100%;
    position: absolute;
    z-index: 2;
}
#search input {
    width: 318px;
    height: 40px;
    background-color: #FFF;
    border: 1px solid #E8E8EF;
    box-sizing: border-box;
    box-shadow: 0px 2px 8px rgba(34,34,87,0.05);
    border-radius: 5px;
    text-indent: 35px;
    font-family: Roboto;
    font-size: 16px;
}
::-webkit-input-placeholder { /* Edge */
  color: #C9C9D5;
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #C9C9D5
}

::placeholder {
  color: #C9C9D5;
}
#search img {
    position: absolute;
    margin-top: 10px;
    width: 18px;
    margin-left: 12px;
}
#header {
    font-size: 20px;
    font-family: Roboto;
    font-weight: bold;
    color: #393C44;
}
#subnav {
    border-bottom: 1px solid #E8E8EF;
    width: calc(100% + 20px);
    margin-left: -20px;
    margin-top: 10px;
}
.navdisabled {
    transition: all .3s cubic-bezier(.05,.03,.35,1);
}
.navdisabled:hover {
    cursor: pointer;
    opacity: .5;
}
.navactive {
    color: #393C44!important;
}
#triggers {
    margin-left: 20px;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: #808292;
    width: calc(88% / 2);
    height: 48px;
    line-height: 48px;
    display: inline-block;
}
.navactive:after {
    display: block;
    content: "";
    width:  100%;
    height: 4px;
    background-color: #217CE8;
    margin-top: -4px;
}
#actions {
    display: inline-block;
    font-family: Roboto;
    font-weight: 500;
    color: #808292;
    font-size: 14px;
    height: 48px;
    line-height: 48px;
    width: calc(88% / 2);
    text-align: center;
}
#footer {
    position: absolute;
    left: 0;
    padding-left: 20px;
    line-height: 40px;
    bottom: 0;
    width: 362px;
    border: 1px solid #E8E8EF;
    height: 67px;
    box-sizing: border-box;
    background-color: #FFF;
    font-family: Roboto;
    font-size: 14px;
}
#footer a {
    text-decoration: none;
    color: #393C44;
    transition: all .2s cubic-bezier(.05,.03,.35,1);
}
#footer a:hover {
    opacity: .5;
}
#footer span {
    color: #808292;
}
#footer p {
    display: inline-block;
    color: #808292;
}
#footer img {
    margin-left: 5px;
    margin-right: 5px;
}
.blockelem:first-child {
    margin-top: 20px
}
.blockelem {
    padding-top: 10px;
    width: 318px;
    border: 1px solid transparent;
    transition-property: box-shadow, height;
    transition-duration: .2s;
    transition-timing-function: cubic-bezier(.05,.03,.35,1);
    border-radius: 5px;
    box-shadow: 0px 0px 30px rgba(22, 33, 74, 0);
    box-sizing: border-box;
}
.blockelem:hover {
    box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
    border-radius: 5px;
    background-color: #FFF;
    cursor: pointer;
}
.grabme, .blockico {
    display: inline-block;
}
.grabme {
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: -14px;
    width: 15px;
}
#blocklist {
    height: calc(100% - 220px);
    overflow: auto;
}
#proplist {
    height: calc(100% - 305px);
    overflow: auto;
    margin-top: -30px;
    padding-top: 30px;
}
.blockin {
    display: inline-block;
    vertical-align: top;
    margin-left: 12px;
}
.blockico {
    width: 36px;
    height: 36px;
    background-color: #F1F4FC;
    border-radius: 5px;
    text-align: center;
    white-space: nowrap;
}
.blockico span {
    height: 100%;
    width: 0px;
    display: inline-block;
    vertical-align: middle;
}
.blockico img {
    vertical-align: middle;
    margin-left: auto;
    margin-right: auto;
    display: inline-block;
}
.blocktext {
    display: inline-block;
    width: 220px;
    vertical-align: top;
    margin-left: 12px
}
.blocktitle {
    margin: 0px!important;
    padding: 0px!important;
    font-family: Roboto;
    font-weight: 500;
    font-size: 16px;
    color: #393C44;
}
.blockdesc {
    margin-top: 5px;
    font-family: Roboto;
    color: #808292;
    font-size: 14px;
    line-height: 21px;
}
.blockdisabled {
    background-color: #F0F2F9;
    opacity: .5;
}
#closecard {
    position: absolute;
    margin-left: 340px;
    background-color: #FFF;
    border-radius: 0px 5px 5px 0px;
    border-bottom: 1px solid #E8E8EF;
    border-right: 1px solid #E8E8EF;
    border-top: 1px solid #E8E8EF;
    width: 53px;
    height: 53px;
    text-align: center;
    z-index: 10;
}
#closecard img {
    margin-top: 15px
}
#canvas {
    position: absolute;
    width: calc(100% - 361px);
    height: calc(100% - 71px);
    top: 71px;
    left: 361px;
    z-index: 0;
    overflow: auto;
}
#propwrap {
    position: absolute;
    right: 0;
    top: 0;
    width: 311px;
    height: 100%;
    padding-left: 20px;
    overflow: hidden;
    z-index: -2;
}
.inputlabel {
    font-family: Roboto;
    font-size: 14px;
    color: #253134;
}
.dropme {
    background-color: #FFF;
    border-radius: 5px;
    border: 1px solid #E8E8EF;
    box-shadow: 0px 2px 8px rgba(34, 34, 87, 0.05);
    font-family: Roboto;
    font-size: 14px;
    color: #253134;
    text-indent: 20px;
    height: 40px;
    line-height: 40px;
    width: 287px;
    margin-bottom: 25px;
}
.dropme img {
    margin-top: 17px;
    float: right;
    margin-right: 15px;
}
.checkus {
    margin-bottom: 10px;
}
.checkus img {
    display: inline-block;
    vertical-align: middle;
}
.checkus p {
    display: inline-block;
    font-family: Roboto;
    font-size: 14px;
    vertical-align: middle;
    margin-left: 10px;
}
#divisionthing {
    height: 1px;
    width: 100%;
    background-color: #E8E8EF;
    position: absolute;
    right: 0px;
    bottom: 80;
}
#removeblock {
    border-radius: 5px;
    position: absolute;
    bottom: 20px;
    font-family: Roboto;
    font-size: 14px;
    text-align: center;
    width: 287px;
    height: 38px;
    line-height: 38px;
    color: #253134;
    border: 1px solid #E8E8EF;
    transition: all .3s cubic-bezier(.05,.03,.35,1);
}
#removeblock:hover {
    cursor: pointer;
    opacity: .5;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}
.blockyname {
    font-family: Roboto;
    font-weight: 500;
    color: #253134;
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
    font-size: 16px;
}
.blockyleft img {
    display: inline-block;
    vertical-align: middle;
}
.blockyright {
    display: inline-block;
    float: right;
    vertical-align: middle;
    margin-right: 20px;
    margin-top: 10px;
    width: 28px;
    height: 28px;
    border-radius: 5px;
    text-align: center;
    background-color: #FFF;
    transition: all .3s cubic-bezier(.05,.03,.35,1);
    z-index: 10;
}
.blockyright:hover {
    background-color: #F1F4FC;
    cursor: pointer;
}
.blockyright img {
    margin-top: 12px;
}
.blockyleft {
    display: inline-block;
    margin-left: 20px;
}
.blockydiv {
    width: 100%;
    height: 1px;
    background-color: #E9E9EF;
}
.blockyinfo {
    font-family: Roboto;
    font-size: 14px;
    color: #808292;
    margin-top: 15px;
    text-indent: 20px;
    margin-bottom: 20px;
}
.blockyinfo span {
    color: #253134;
    font-weight: 500;
    display: inline-block;
    border-bottom: 1px solid #D3DCEA;
    line-height: 20px;
    text-indent: 0px;
}
.block {
    background-color: #FFF;
    margin-top: 0px!important;
    box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
}
.selectedblock {
    border: 2px solid #217CE8;
    box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
}

@media only screen and (max-width: 832px) {
    #centerswitch {
        display: none;
    }
}
@media only screen and (max-width: 560px) {
    #names {
        display: none;
    }
}
</style>
