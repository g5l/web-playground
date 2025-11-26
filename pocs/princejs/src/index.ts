import { prince } from "princejs";
import { z } from "zod";
import { cors, logger } from "princejs/middleware";
// import { validate } from "princejs/validation";
import { Html, Head, Body, H1, P, render } from "princejs/jsx"


const app = prince();

app.use(cors());
app.use(logger());

const schema = z.object({ 
  name: z.string(),
  age: z.number() 
});

app.get("/", () => ({ message: "Hello! test" }));

app.get("/users/:id", (req) => ({ id: req.params.id }));

// app.use(validate(schema));

const Page = () => (
  Html({
    children: [
      Head({
        children: [
          "Test Page"
        ]
      }),
      Body({
        children: [
          H1({
            children: "Hello World"
          }),
          P({
            children: "This is a Gabriel test"
          })
        ]
      })
    ]
  })
);

app.get("/jsx", () => render(Page()));

app.listen(3000);
