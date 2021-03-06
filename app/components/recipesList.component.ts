import {Component} from "@angular/core";
import { TextField } from "ui/text-field";
import {FirebaseUserService} from "../services/firebaseUser.service";
import {RouterExtensions} from "nativescript-angular";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { View } from 'tns-core-modules/ui/core/view';

@Component({
    selector: "recipes-list",
    moduleId: module.id,
    templateUrl: "./recipesList.component.html",
    styleUrls: ['./recipesList.component.css']
})

export class RecipesListComponent {
    private recipeLists: {title:string, recipes:[string]}[] = [];
    private listName: string = "";
    private inputBox: any = null;
    private currentUser: any;

    constructor(private userService: FirebaseUserService,
                private recipeService: FirebaseRecipeService,
                private routerExtensions: RouterExtensions) {
        this.userService.user$.subscribe((result) => {
            this.recipeLists = [];
            this.currentUser = result;
            this.currentUser.recipe_list.forEach((item) => {
                this.recipeLists.push(item);
            })
        })
    }    

    addList(args: any) {
        let textField = <TextField>args.object;
        if(textField.text != "") {
            this.recipeLists.push({title:textField.text, recipes: [""]});
            textField.text = "";
        }
    }

    onTextChange(args) {
        let textField = <TextField>args.object;
        this.listName = textField.text;
        this.inputBox = textField;
    }

    saveResponse(args) {
        if(this.listName != "") {
            this.recipeLists.push({title:this.listName, recipes: ['filler']});
            this.inputBox.text = "";
        }
    }

    removeList(i: number) {
        if (this.recipeLists[i].title !== 'My Custom List' && this.recipeLists[i].title !== "My Favorite Recipes") {
            this.recipeLists.splice(i, 1);
        }
    }

    updateList() {
        this.userService.update_user_V2(Object.assign(this.currentUser, {recipe_list: this.recipeLists}));
        this.routerExtensions.navigate(["/landing"]);
    }

    getRecipes(index: number) {
        let listIds = this.currentUser.recipe_list[index].recipes;
        this.recipeService.getRecipeList(listIds);
    }

    onScroll(event: ScrollEventData, scrollView: ScrollView, topView: View) {
        if (scrollView.verticalOffset < 250) {
            const offset = scrollView.verticalOffset / 2;
            if (scrollView.ios) {
                topView.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
            } else {
                topView.translateY = Math.floor(offset);
            }
        }
    }
}