let a=0;
function submitfun(e){
   e.preventDefault();
    a=localStorage.length;
    a++;
    while(localStorage.getItem(a))
    {
        a++;
    }
    //console.log(++a);
    let ar=e.target.elements;
    //console.log(ar.length)
    let myobj={
        expense:ar[0].value,
    discription:ar[1].value,
    category:ar[2].value,
    }
    let myobjstr=JSON.stringify(myobj);
    
    
    
    
    localStorage.setItem(a,myobjstr);
    displaylist();

    
    
}

function displaylist(){
    let lists=document.querySelectorAll('.list-group-item');
    for(let i=0;i<lists.length;i++)
    {
        lists[i].remove();
    }

    let listparent=document.querySelector('.list-group');
    for(let i=0;i<localStorage.length;i++)
    {
        let listnode=document.createElement('li');
        listnode.className='list-group-item';
        let key=localStorage.key(i);
        let obj=JSON.parse(localStorage.getItem(key));

        let divforkey=document.createElement('div');
        divforkey.className='retrivekey';
        divforkey.setAttribute('style', 'display:none');
        divforkey.textContent=key;

        let editbtn=document.createElement('button');
        editbtn.className='edit-btn btn btn-secondary';
        editbtn.setAttribute('type','button');
        editbtn.setAttribute('onclick','editfun(this)');
        editbtn.textContent='Edit';


        let deletebtn=document.createElement('button');
        deletebtn.className='delete-btn btn btn-danger';
        deletebtn.setAttribute('type','button');
        deletebtn.setAttribute('onclick','deletefun(this)');
        deletebtn.textContent='Delete';


        
        

        let textnode=document.createTextNode("Expense : "+obj['expense']+" , Discription : "+obj['discription']+' , Category : '+obj['category']);
        listnode.appendChild(divforkey);
        listnode.appendChild(textnode);
        listnode.appendChild(editbtn);
        listnode.appendChild(deletebtn);
        listparent.appendChild(listnode);
    }


    

}


function editfun(e){
    
    let listtodelete=e.parentNode;
   let key=listtodelete.children[0].innerText;

   let objstr=localStorage.getItem(key);
   let obj=JSON.parse(objstr);

   let exp=document.querySelector('#expense');
   let disc=document.querySelector('#discription');
   let cat=document.querySelector('#category');

   exp.value=obj['expense'];
   disc.value=obj['discription'];
   cat.value=obj['category'];

   listtodelete.remove();
   localStorage.removeItem(key);
   
}


function deletefun(e){
    let listtodelete=e.parentNode;
    let key=listtodelete.children[0].innerText;
    listtodelete.remove();
    localStorage.removeItem(key);

}
document.querySelector(".myform").addEventListener('submit',submitfun);
displaylist();