const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const bodyparser = require("koa-bodyparser");
const PORT = process.env.PORT || 4000;
// const async = require('asy')
const db = require("./dbconnection");
const cors = require("@koa/cors");

//------------------------------------------

function deleteItem(ctx) {
  const idx = ctx.request.body.idx;
  return new Promise((ok, ng) => {
    try {
      db.query(`delete from board where idx=${idx}`, (err, rows) => {
        if (!err) {
          ok(rows);
        } else {
        }
      });
    } catch (error) {
      ng("x");
    }
  });
}

function getList(ctx) {
  const idx = ctx.request.body.idx;
  return new Promise((ok, ng) => {
    try {
      db.query(
        `select * from board order by idx DESC limit ${idx}`,
        (err, rows) => {
          if (!err) {
            ok(rows);
          } else {
          }
        }
      );
    } catch (error) {
      ng("x");
    }
  });
}

function plusList(ctx) {
  const idx = ctx.request.body.idx;
  return new Promise((ok, ng) => {
    try {
      db.query(
        `select * from board order by idx DESC limit ${idx}`,
        (err, rows) => {
          if (!err) {
            ok(rows);
          } else {
          }
        }
      );
    } catch (error) {
      ng("x");
    }
  });
}

function writeItem(obj) {
  const { context, subject, password, writer } = obj;
  return new Promise((ok, ng) => {
    db.query(
      `insert into board  (writer, context, subject, password)
                             values ('${writer}', '${context}','${subject}','${password}');`,
      (err, rows) => {
        if (!err) {
          ok(rows);
        } else {
          ng(err);
        }
      }
    );
  });
}

router.post("/", ctx => {
  ctx.body = "asdasdasd";
});

router.post("/DB/delete", async ctx => {
  await deleteItem(ctx).catch(ng => {
    console.log(ng);
  });
  ctx.body = "OK";
});

router.post("/DB/write", async ctx => {
  console.log("write");

  const obj = {
    ...ctx.request.body
  };
  await writeItem(obj);

  ctx.body = "OK";
});

router.post("/DB/getList", async ctx => {
  const x = await getList(ctx);
  ctx.body = x;
});

router.post("/DB/plusList", async ctx => {
  const x = await plusList(ctx);
  ctx.body = x;
});

// router.post('/DB/test', ctx => {
//     const obj = {
//         ...ctx.request.body
//     }
//     console.log("posttest");
//     console.log(obj);
//     ctx.body = ""
// })

router.post("/DB/test", async ctx => {
  const obj = {
    ...ctx.request.body
  };
  // f2(obj)
  ctx.body = "OK";
});

function f1(ctx) {
  return new Promise((ok, ng) => {
    try {
      db.query(`select idx from board`, (err, rows) => {
        if (!err) {
          ok(rows);
        } else {
        }
      });
    } catch (error) {
      ng("x");
    }
  });
}

router.get("/DB/read", async ctx => {
  console.log(1);

  const x = await f1(ctx);
  console.log("x");
  console.log(x);

  ctx.body = x;
  // try {
  //     console.log(2);
  //       await db.query(`select idx from board where idx=30`, (err, rows) => {
  //         if (!err) {
  //             console.log("if");
  //             console.log(rows[0].idx);

  //             ctx.body = "1000"
  //         } else {
  //             console.log("else");
  //         }
  //     });
  // } catch (error) {
  //     console.log("e",error);
  // }
});

//------------------------------------------

app.use(cors());
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, () => {
  console.log("server open");
});
