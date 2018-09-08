let vm = new Vue({
    el: '#root',
    computed:{
        checkedAll:{
            get(){
                if (this.products.length===0) return false;
               return this.products.every(item=>item.isChecked);
            },
            set(val){
                this.products.forEach(item=>{
                   item.isChecked = val;
                });
            }
        },
        sum(){
           return this.products.reduce((prev,next)=>{
                if (!next.isChecked) return prev;
                return prev + next.productPrice*next.productCount;
            },0);
        }
    },
    methods: {
        remove(product) {
            this.products = this.products.filter(
                item => item !== product
            );
        }
    },
    filters: {
        toFixed(param1, param2) {
            return "￥ " + param1.toFixed(param2);
        }
    },
    data: {
        products: [],
    },
    created() {
        axios.get('./products.json').then((res) => {
            this.products = res.data;
        }, (error) => {

        })
    }
});