<template>
  <div style="max-width: 800px; margin: 0 auto;">
    <div class="filters py-3 px-3">
      <div class="filter mr-3 w-64">
        <div class="filters-title text-left text-sm">Название</div>
        <el-input size="small" v-model="filters.search"></el-input>
      </div>
      <div class="filter mr-3">
        <div class="filters-title text-left text-sm">Категория</div>
        <el-select size="small" v-model="filters.category" placeholder="Выберите категорию">
          <el-option v-for="(key, value) in categories" :key="key+'category'" :value="key" :label="value"></el-option>
        </el-select>
      </div>
      <div class="filter">
        <div class="filters-title text-left text-sm">Сортировка</div>
        <el-select size="small" v-model="filters.sort" placeholder="Выберите категорию">
          <el-option :value="1" label="Название вверх"></el-option>
          <el-option :value="-1" label="Название вних"></el-option>
        </el-select>
      </div>
    </div>
<!--    {{list}}-->
    <ul class="table w-full mt-5">
      <li class="flex bg-gray-200 py-2 rounded-t-xl">
        <div class="w-24 text-left pl-3">ID</div>
        <div class="w-64 text-left pl-3">Название товара</div>
        <div class="w-64 text-left pl-3">Категория</div>
      </li>
      <DynamicScroller
          :items="list"
          :min-item-size="54"
          page-mode
          item-height="40"
          class="scroller bg-gray-50 "
      >
        <template v-slot="{ item, index, active }">
          <DynamicScrollerItem
              :item="item"
              :active="active"
              :size-dependencies="[
                item.title,
              ]"
              :data-index="index"
          >
            <div class="flex mt-3 border-0 border-b border-solid border-gray-100">
            <div class="w-24 text-left pl-3">{{item.id}}
            </div>
            <div class="w-64 text-left pl-3">{{`${item.title} ${item.title2 || ''}` }}</div>
            <div class="w-64 text-left pl-3">{{ item.category }}</div>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </ul>
    <el-pagination></el-pagination>
  </div>
</template>

<script>

// import {TodoController} from "@/api/TodoController";
import data from '@/api/resource/data.json'

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      listTodo: [],
      columns: [
        {key: 'id', dataKey: 'id', title: 'Идентификатор товара', width: 150},
        {key: 'title', dataKey: 'title', title: 'Название товара', width: 200}
      ],
      filters: {
        search: '',
        page: 1,
        limit: 10,
        category: null
      },
      listTodoController: null,
      categories: {},
    }
  },
  computed: {
    list(){
      if(this.filters.search) {
        console.log(this.filters.search, data)
        return data && data.filter(k=> `${k.title} ${k.title2 || ''}`.toLowerCase().includes(this.filters.search.toLowerCase()));
      }
      if(this.filters.sort) {
        if(this.filters.sort === -1) {
          return data.sort((a, b)=> {
            if ( a.title < b.title ){
              return -1;
            }
            if ( a.title > b.title ){
              return 1;
            }
            return 0;
          })
        }
        if(this.filters.sort === 1) {
          return data.sort((a, b)=> {
            if ( a.title < b.title ){
              return 1;
            }
            if ( a.title > b.title ){
              return -1;
            }
            return 0;
          })
        }
      }
      if(this.filters.category) {
        console.log(this.filters.category)
        return data.filter(k=> k.category === this.filters.category)
      }
      return data;
    },
  },
  mounted() {
    data.forEach(k=> {
      if(!this.categories[k.category] && k.category) {
        this.categories[k.category] = k.category;
      }
    })
  },
  methods: {
    // async getListTodo() {
    //   this.loader = this.listTodoController.getLoaderStatus()
    //   await this.listTodoController.setListTodos();
    //   // this.listTodo = [...this.listTodoController.getListTodos(this.filters)]
    // }
  }
}
</script>

<style lang="scss">

.filters{
  @apply flex bg-gray-100 border-gray-200 border-solid border rounded-xl;
  .filter{
    @apply mr-3
  }
 .filters-title {
    @apply text-gray-500
 }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.scroller {
  height: 100%;
}
</style>
