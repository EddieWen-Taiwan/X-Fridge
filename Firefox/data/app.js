$(function(){
	if(!localStorage.getItem("aaa"))
		localStorage.setItem("aaa", "aaaa");
	else
		alert(localStorage.getItem("aaa"));
})