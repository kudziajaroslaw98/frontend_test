import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import {
  RadioButtonListComponent,
  RadioButtonOption,
} from '../components/radio-button-list/radio-button-list.component';

import * as loadedArticles from './data.json';

enum RadioButtonOptions {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  RANDOM = 'RANDOM',
}

interface Article {
  id: number;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    RadioButtonListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    style: 'display: flex; flex-direction: column; flex: 1;',
  },
})
export class AppComponent {
  public initialArticle: Article = {
    id: 1,
    text: `Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  };
  public loadedArticles: Article[] = loadedArticles.data as Article[];
  public articles: Article[] = [this.initialArticle];
  public radioOptions: RadioButtonOption<RadioButtonOptions>[] = [
    { value: RadioButtonOptions.FIRST, label: 'Opcja pierwsza' },
    { value: RadioButtonOptions.SECOND, label: 'Opcja druga' },
    { value: RadioButtonOptions.RANDOM, label: 'Opcja losowa' },
  ];

  public pickedOption: RadioButtonOptions = RadioButtonOptions.FIRST;

  public areCredentialsVisible = false;

  public clearSettings() {
    this.areCredentialsVisible = false;
    this.pickedOption = RadioButtonOptions.FIRST;
    this.articles = [this.initialArticle];
  }

  public showCredentials() {
    this.areCredentialsVisible = true;
  }

  public radioSelectionChange(value: RadioButtonOptions) {
    this.pickedOption = value;
  }

  public swapArticles() {
    if (this.pickedOption === RadioButtonOptions.FIRST) {
      this.articles = [this.loadedArticles[0]];
    } else if (this.pickedOption === RadioButtonOptions.SECOND) {
      this.articles = [this.loadedArticles[1]];
    } else {
      const newElement = this.getRandomElement(
        this.loadedArticles,
        [this.articles[this.articles.length - 1]],
        2
      );

      if (newElement !== null) {
        this.articles = [newElement];
      }
    }
  }

  public pushArticle() {
    if (this.pickedOption === RadioButtonOptions.FIRST) {
      const newElement = this.getRandomElement(
        [this.loadedArticles[0]],
        this.articles,
        0
      );

      if (newElement !== null) {
        this.articles.push(newElement);
      }
    } else if (this.pickedOption === RadioButtonOptions.SECOND) {
      const newElement = this.getRandomElement(
        [this.loadedArticles[1]],
        this.articles,
        0
      );

      if (newElement !== null) {
        this.articles.push(newElement);
      }
    } else {
      const newElement = this.getRandomElement(
        this.loadedArticles,
        this.articles,
        2
      );

      if (newElement !== null) {
        this.articles.push(newElement);
      }
    }
  }

  private getRandomElement(
    array: Article[],
    referenceArray: Article[],
    startFrom: number = 2
  ): Article | null {
    let possibleElements = array
      .slice(startFrom)
      .filter((el) => !referenceArray.some((item) => el?.id === item?.id));
    let selectedElement: Article | null = null;
    let selectedIndex: number | null = null;

    do {
      if (possibleElements.length === 0) {
        alert('No available elements to select');
        break;
      }

      selectedIndex = Math.floor(Math.random() * possibleElements.length);
      selectedElement = possibleElements[selectedIndex];

      possibleElements.splice(selectedIndex, 1);
    } while (
      selectedElement.id === referenceArray[referenceArray.length - 1]?.id
    );

    return selectedElement;
  }
}
