import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedData, addMessage, deleteMessage, updateMessage } from "./redux/messageSlice";

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectedData);
  console.log("data", posts);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setID] = useState(1);
  const add = () =>{
    dispatch(addMessage({id: posts.length +1, title, amount}))
  }
  const update = () =>{
    dispatch(updateMessage({ id: id, title: title, amount: amount }))
    setIsUpdate(!isUpdate);
  }
  return (
    <View>
      <Text>Post</Text>
      <View>
        <Text>Title</Text>
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={{ borderWidth: 1 }}
        />
      </View>
      <View>
        <Text>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={(text) => setAmount(text)}
          style={{ borderWidth: 1 }}
        />
      </View>
      <Pressable
        onPress={() => {
          isUpdate
            ? update()
            : add()
          setAmount(""), setTitle("");
        }}
        // onPress={()=>{
        //     // dispatch(addMessage({id:posts.length +1, title, amount}))
        //     add()
        // }}
        style={{ borderWidth: 1, marginTop: 20, width: 50 }}
      >
        <Text>{isUpdate ? "Update" : "Post"}</Text>
      </Pressable>
      <View>
        {posts.map((post) => (
          <View
          key={post.id}
            style={{
              flexDirection: "row",
              marginHorizontal: 5,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text>Title: {post.title}</Text>
              <Text>Amount: {post.amount}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                onPress={() => {
                  setIsUpdate(true);
                  setAmount(post.amount);
                  setTitle(post.title);
                  setID(post.id);
                }}
                style={{ borderWidth: 1, marginHorizontal: 5, padding: 5 }}
              >
                <Text>Edit</Text>
              </Pressable>
              <Pressable
                onPress={()=>{
                   dispatch(deleteMessage({id:post.id}))
                }}
                style={{ borderWidth: 1, marginHorizontal: 5, padding: 5 }}
              >
                <Text>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Post;
