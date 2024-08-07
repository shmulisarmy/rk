from typing import Annotated, Optional
from fastapi import FastAPI, Depends, HTTPException, status, Request, WebSocket, WebSocketDisconnect
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

from database import get_menu_options


app = FastAPI()

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/{path}", response_class=HTMLResponse, status_code=status.HTTP_200_OK)
async def read_root(request: Request, path: Optional[str] = None):
    return templates.TemplateResponse("main.html", {"request": request, "path": path, "menu": get_menu_options()})


@app.get("/", response_class=HTMLResponse, status_code=status.HTTP_200_OK)
async def read_main(request: Request):
    return templates.TemplateResponse("main.html", {"request": request, "menu": get_menu_options()})


@app.get("api/menu")
async def read_menu():
    return get_menu_options()


@app.post("/order")
async def order(cart: dict):
    print(cart)
    return "we have received your order!"