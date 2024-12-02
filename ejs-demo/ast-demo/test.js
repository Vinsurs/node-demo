function add(a, b) {
    console.dir("进入函数")
    debugger;
    if (a > b) {
        debugger;
        console.info("走进了if条件语句")
        if (a > 100) {
            console.info("进入a>100的if条件语句")
            debugger;
        }
    }
    console.log("函数即将执行完毕")
    return a + 
    // Weird formatting, huh?
    b;
}