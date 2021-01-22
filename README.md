# gulp-code-copy
copy and past code snippets

### USE inside javascript
```javascript
//=copy MY_VAR
my code snippet
//=end-copy

function myFx(){
	//=past MY_VAR
}
//=past MY_VAR2

//=copy MY_VAR2
...
//=end-copy
```

### USE inside coffeescript
```coffeescript
#=copy MY_VAR
my code snippet
#=end-copy

myFx= ->
	#=past MY_VAR
	return cc
myFx2= ->
	#=past MY_VAR
	return cc+'dd'
```


