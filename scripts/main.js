import ThemeSwitcher from "./ThemeSwitcher.js";
import NewTaskCreate from "./NewTaskCreate.js"
import ModalMenuController from "./ModalMenuController.js";
import ItemController from "./ItemController.js";
import ItemState from "./ItemState.js"
import { loadContent } from "./utils/localStorage.js"

new ThemeSwitcher();
new NewTaskCreate();
new ModalMenuController();
new ItemController();
new ItemState();
loadContent();
