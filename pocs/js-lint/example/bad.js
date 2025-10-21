function greet(name, description) {
  console.log("Hello " + name);     
  debugger
  const test = 1;

  if(name){
    const message = "This line is way too long for the linter, it should definitely trigger the maxLineLength rule since it goes beyond 120 characters easily.";
    console.log(message);
  }

  console.log(message);
}
greet("Gabriel");

function outer() {
  if (true) {
    const onlyHere = 42;
    var hoisted = 7;
  }

  console.log(onlyHere);

  console.log(hoisted);

  console.log(notDeclaredAnywhere);
}

outer();

unknownCall();
