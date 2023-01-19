//! Elements

const todoInput = document.getElementById("todo-input"); //? works faster than querySelector

const addBtn = document.querySelector("#todo-button");

const todoUl = document.querySelector("#todo-ul");

//? data is kept as "string" in local storage
//? we should parse it to array with "JSON.parse()"

let todoList = JSON.parse(localStorage.getItem("todoList")) || []
//local storage de veriler string olarak tutuluyor o yüzden bizim onları parse edip array haline sokmamız lazım.Burda şunu yaptık local storage de veri varsa(todolist) dizi haline soksun veya boş bir array oluştursun.işlemler esnasında güncellenebilen global bir dizi oldu bu.Daha önce kaydettiğimiz verileri bu dizi vasıtası ile localstorage gönderceğiz.todo listin son halini array halinde localstoragede saklayacağız.👆



window.addEventListener("load", () => {
    getTodoListFromLocalStorage();
});
//localstorageden gelen verileri alıp ekrana basmak için böyle bir fonksiyon tanımladık.👆
const getTodoListFromLocalStorage = () => {
    // console.log(todoList);
    todoList.forEach((todo)=>{
createTodo(todo);
    });
    
}
//local storageden aldığım verileri arayüze yükleyecek.👆


addBtn.addEventListener("click", (e) => {
   
    e.preventDefault(); //sen bir formsun senin görevin verileri submit etmek aslında ama ben senin default olarak submit etmek olan görevini prevent(önlüyorum)çünkü default olarak görevi sayfayı yenilemek bunu önlemeye çalışıyoruz.submit etmeyip buton click olarak çalışacaksın yoksa eklediğimiz verileri sayfamızda göremeyiz sayfa yenilendiği için.👆

    if(todoInput.value.trim() === ""){

        alert("Please, enter new todo text!");
          return;
    }
    // inputun içindeki veriye ulaştık eğer veri boş ise alert ile uyarı verecek.return yazmamızın sebebi de fonksiyondan çıkmasını sağlamak.👆

    const newTodo = {
        //yeni bir obje yapısı oluşturuyoruz 👇
        id : new Date().getTime(), //! 👈 unique(benzersiz) ID with milliseconds of now.newdate ile şuandaki tarihi alıp milisaniyeye çeviriyoruz gettime ile.Benzersiz olması için bunu yaptık.
        completed : false, //! 👈 STATUS item ları tamamlayıp tamamlamadığımı veri tabanında tutacak.Telefon kapandığında da kayıt etmiş olacak.default olarak itemlar yani görevler tamamlanmamış kabul edilecek.
        text : todoInput.value //! 👈 USER INPUT kullanıcının girdiği yapılacak listesi
        
    }

    createTodo(newTodo);//kullanıcıdan alınan objeyi oluşturuyoruz. 
    
todoList.push(newTodo);
//newtodo objesinde kullanıcının girdiği bilgileri global alanda oluşturduğumuz todoList array ine push luyoruz.
//!!!!!!!!stringify!!!!!!!!!array i stringe çeviriyor.çünkü localstorage de text olarak string olarak tutmamız gerekiyor.setitem yaparken stringfy getitem yaparken parse unutma!!!!!
localStorage.setItem("todoList", JSON.stringify(todoList));
//set item ile güncel olan todolist i local storage veriyoruz. ilk parametre key ikinci olan value.
e.target.closest("form").reset();//formun içindeki tüm inputları resetliyor.e.target buton demekti ordan forma gitti ve resetledi.

})




const createTodo = (newTodo) =>{
//todo item creation newtodo objesi fonksiyonun içine geliyor.Burdaki verileri destr.edceğiz ve ilgili html ve buton vasıtasi ile arkadaki localstorage bascağız.
//alert("item was added");newTodo objemi oluşturdum createTodo fonksiyonuma verdim destr.ettim istediğim htmel formatında basacağım uı.
//obj. dest. js es6 ile girdi. (ES6 => JS'e kazandırılan yapılar??)
const { id, completed, text } = newTodo;

//create li li elementine id yi li ye atıyoruz setatribu. ile
const li = document.createElement("li");
li.setAttribute("id", id);

//add class with completed(status)
completed ? li.classList.add("checked") : ""; //tamamlanmış bir todo ise checked classını atarım.tamamlanmadı ise li nin başka classı yok.

//create check icon li nin başına check iconu koyuyorum.
const icon = document.createElement("i");
icon.setAttribute("class", "fas fa-check"); //key value yapısı fas fa-check classı verdik.
//append vs. appendChild
li.append(icon); //iconu li ye append  ediyoruz.

//create item text
const p = document.createElement("p");
p.innerText = text; //fonksiyona parametre olarak verdiği input verisini aldık p nin innerText ine atadık.
li.appendChild(p);

//create remove icon
const removeIcon = document.createElement("i");
removeIcon.setAttribute("class", "fas fa-trash");
li.append(removeIcon);

console.log(li);

//append li to ul li yi de ul ye append ettik.
todoUl.append(li);
}

//Capturing vs Bubbling
//parenta eventlistener tanımlayarak içindeki bütün child lara yükledik.
todoUl.addEventListener("click",(e)=>{
  const idAttr = e.target.closest("li").getAttribute("id");
   if(e.target.classList.contains("fa-check")){
    // alert("check clicked");
    e.target.parentElement.classList.toggle("checked");
    todoList.forEach((todo)=>{
        if(todo.id == idAttr){
            todo.completed = !todo.completed;

        }
        localStorage.setItem("todoList", JSON.stringify(todoList));
    });
    //check tıklandığında class değişti ve yapılacak css değişiklikleri aktif oldu.
   }
  else if(e.target.classList.contains("fa-trash")){
    // alert("remove clicked");
    //UI den siliyoruz
    e.target.parentElement.remove();
    //silineni  diziden de silecek.id si ile silinmeyenleri filtrele array i güncelle
    todoList = todoList.filter((todo)=>todo.id !=idAttr);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    //güncel olan arrayi local storage e attık👆
   }
   else{
    alert("other element clicked");
   }
console.log(todoList);
})