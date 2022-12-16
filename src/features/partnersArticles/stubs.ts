import { IPartnerArticle } from "@features/partnersArticles/types";

export const partnerArticleAPIStub: Omit<IPartnerArticle, 'id'> = {
  description: "Partners article eyeliner",
  created: {
    seconds: 123142,
    nanoseconds: 234124,
  },
  "company-name": "Partners article",
  image: "https://firebasestorage.googleapis.com/v0/b/karpov-news-349ee.appspot.com/o/2.jpg-1666167498768?alt=media&token=e5549a2c-9764-47a6-815f-b87bff605ce6",
  title: "Article title",
  text: "Partners article text Partners article text Partners article text Partners article text Partners article text Partners article text Partners article text Partners article text Partners article text Partners article text Partners article text Partners article text"
}