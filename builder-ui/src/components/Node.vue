<!-- eslint-disable -->
<template lang="html">
  <div class="example-node relative  bg-white rounded border border-gray-300"
  :style="{ width: `${width}px`} ">
    <div class="flex flex-col border-b border-gray-300">
      <div class="flex flex-row flex-no-wrap justify-between items-center p-4">
        <div class="flex flex-row flex-no-wrap justify-start items-center">
          <div class="flex-shrink bg-blue-2 mr-2">
            <img :src="`assets/${icon}.svg`" width="25" />
          </div>
          <div class="font-bold text-md text-gray-800">
            {{ title }}
          </div>
        </div>
        <div @click.stop="dropdown = !dropdown">
          <flowy-drag-handle>
            <img :src="`assets/grabme.svg`" />
          </flowy-drag-handle>
          <div class="absolute z-50 -ml-10 py-2 bg-white shadow rounded text-xs" v-show="dropdown">
            <span class="cursor-pointer p-2 hover:bg-gray-200" @click="remove()">remove</span>
          </div>
        </div>
      </div>
    </div>
    <modal name="job00001" style="z-index: 9999">
          <div class="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
            <div class="max-w-md mx-auto">
                  <div class="text-base leading-6 space-y-4 text-gray-700 sm:text-lg">
                      <div class="flex flex-col">
                        <label class="leading-loose">Interval</label>
                        <div class="relative inline-flex">
                          <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" style="right:12px !important" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
                          <select class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                            <option>Choose an interval</option>
                            <option>Once</option>
                            <option>Every minute</option>
                            <option>Every hour</option>
                            <option>Every day</option>
                          </select>
                        </div>
                      </div>
                    <div class="pt-4 flex items-center space-x-4">
                        <button @click="closeModal('job00001')" class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                          <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
                        </button>
                        <button @click="closeModal('job00001')" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Save</button>
                    </div>
                  </div>
                </div>
          </div>
        </modal>
        <modal name="takebtcloan">
          <div class="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12" style="z-index: 99999999">
            <div class="max-w-md mx-auto" style="z-index: 99999999">
                  <div class="text-base leading-6 space-y-4 text-gray-700 sm:text-lg">
                      <div class="flex flex-col">
                        <label class="leading-loose">Criteria</label>
                        <div class="relative inline-flex">
                          <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" style="right:92px !important" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
                          <select class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                            <option>Below</option>
                            <option>Above</option>
                          </select>
                        </div>
                        <label class="mt-2 leading-loose">Price</label>
                        <input type="text" class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="60,000">
                      </div>
                    <div class="pt-4 flex items-center space-x-4">
                        <button @click="closeModal('takebtcloan')" class="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                          <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
                        </button>
                        <button @click="closeModal('takebtcloan')" class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Save</button>
                    </div>
                  </div>
                </div>
          </div>
        </modal>
    <div class="flex flex-row flex-no-wrap ml-4 mb-4">
      <div class="flex-grow flex flex-col">
        <div class="mt-2 text-sm text-gray-700" v-html="description">

        </div>
        <a href="#" :id="title" @click="openModal(title)" class="text-right pr-4"><i class="fas fa-cog"></i></a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.bg-white {
  background-color: #fff;
}
</style>

<script>
/* eslint-disable no-unused-vars */

export default {
  props: {
    width: {
      default: 250,
    },
    remove: {
      type: Function,
      required: true,
    },
    node: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dropdown: false,
      executed: false,
    };
  },
  mounted() {
  },
  destroyed() {

  },
  methods: {
    openModal(type) {
      console.log('tdata', this.executed);
      if (!this.executed) {
        this.$modal.show(type.replace(/\s/g, '').toLowerCase());
      }
      this.executed = true;
    },
    closeModal(type) {
      this.$modal.hide(type.replace(/\s/g, '').toLowerCase());
      this.executed = false;
    },
  },
};
</script>
