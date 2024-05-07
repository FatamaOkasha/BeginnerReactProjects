
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({children,onClick}){
  return (
    <button className="button" onClick={onClick}>{children}</button>
  )
}
function App () {
  const [showAddFriend,setShowAddFriend]=useState(false)
  const [selectedFriend,setSelectedFriend]=useState({});
  const [friends,setFriends]=useState(initialFriends);

  function handleShowAddFriend(){
    setShowAddFriend((showAddFriend)=>!showAddFriend);
  }
  function handleAddNewFriend(newFriend){
    setFriends((friends)=>[...friends,newFriend])
    setShowAddFriend(false);
  }
  function handleSelection(friend){
    setSelectedFriend((selectedFriend)=>selectedFriend?.id!==friend.id?friend:null);
    setShowAddFriend(false);
  }
function handleSplitBill(value){
  // console.log(value)
  setFriends((friends)=>friends.map((friend)=>(
    selectedFriend.id===friend.id ? {...friend,balance:friend.balance+value}:friend
  )))
  setSelectedFriend(null);
}
  
  return (
    <div className="app"> 
    <div className="sidebar">
    <FriendsList friends={friends} onSelectionFriend={handleSelection}selectedFriend={selectedFriend} />

    {(showAddFriend) && <FormAddFriend onHandleAdNewFriend={handleAddNewFriend} />}

    <Button onClick={handleShowAddFriend} >{!showAddFriend?"Add friend":"close"}</Button>
    </div>
    {selectedFriend&&<FormSplitBill selectedFriend={selectedFriend} onHandleSplitBill={handleSplitBill}/>}
    </div>
  )
}
function FriendsList({friends,onSelectionFriend,selectedFriend}){
  const data=friends;
 return <ul>
         {data.map((friend)=>(<FriendItem friend={friend} key={friend.id} onSelectionFriend={onSelectionFriend} selectedFriend={selectedFriend}/>))} 
 </ul>
}

function FriendItem({friend,onSelectionFriend,selectedFriend}){
  const isSelected=selectedFriend?.id===friend.id;

  return (
    <li className={isSelected ?'select':''}>
      <h3>{friend.name}</h3>
      <img src={friend.image} alt={friend.name}/>
      {friend.balance <0 && <p className="red">You owe {friend.name} {-1* friend.balance}$ </p>}
      {friend.balance >0 && <p className="green"> {friend.name} owes you {friend.balance}$ </p>}
      {friend.balance ===0 && <p >You and {friend.name} are even</p>}
      <Button onClick={()=>onSelectionFriend(friend)}>{isSelected? "Close":"Select"}</Button>
    

    </li>
  )
}
function FormAddFriend({onHandleAdNewFriend}){
  const [name,setName]=useState("");
  const [image,setImage]=useState("https://i.pravatar.cc/48");

  const id =crypto.randomUUID();
  
  function handleSubmit(e){
    e.preventDefault();
    if (! name || ! image) return ;
    const newFriend={name,image:`${image}?=${id}`,balance:0,id}
    onHandleAdNewFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit} >
      <label>👬Friend name</label>
      <input type="text" value={name} onChange={(e)=>(setName(e.target.value))} />
      <label>🌆Image Url</label>
      <input type="text" value={image} onChange={(e)=>(setImage(e.target.value))}/>

      <Button>Add</Button>
    </form>
   
)
}

function FormSplitBill({selectedFriend,onHandleSplitBill}){
  const [bill,setBill]=useState('');
  const [paidByUser,setPaidByUser]=useState('');
  const paidByFriend= bill ? bill-paidByUser:"";
  const [whoIsPaying,setWhoIsPaying]=useState('user');

  function handleSubmit(e){
     e.preventDefault();
     if (!bill || !paidByUser) return ;
    onHandleSplitBill(whoIsPaying==='user'? paidByFriend : -paidByUser)
  }
  return(
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input type="text" value={bill} onChange={(e)=>setBill(+e.target.value)}></input>

      <label>🧍‍♀️Your expense</label>
      <input type="text" value={paidByUser} onChange={(e)=>setPaidByUser(+e.target.value>bill?paidByUser:+e.target.value)}/>

      <label>👫{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend}/>

      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button >Split bill</Button>
    </form>
  )
}

export default App ;