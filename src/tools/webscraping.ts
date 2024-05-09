import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

async function get_fragance_from_supplier(fragancename: string) {
    let urlEncodeFraganceName = encodeURI(fragancename)
    const loader = new CheerioWebBaseLoader(
        "https://magnaperfumes.com/search.php?search_query="+urlEncodeFraganceName+"&section=product",
        {
            selector:"div.prod-item",
        }
      );
      const docsRaw = await loader.scrape()
      // console.log(docsRaw.html());


      // docsRaw("img.card-image").each((i, el) => {
      //   // console.log(i);
      //   // console.log(docsRaw(el));
      //   const product = docsRaw(el)
      //   console.log(product);
      //   console.log(product.attr('data-src'));
      // });
      let productText = null;
      docsRaw("article.card").each((i, el) => {

        if(i==0){
          // console.log(i);
          // console.log(docsRaw(el));
          const product = docsRaw(el)
          const productImage = product.find('img.card-image').attr('data-src')?.toString().replaceAll("224x224","1280x1280");
          const productTitle = product.find('img.card-image').attr('title');
          const productPrice = parseInt(product.find('span.price').text().slice(1).replaceAll(",","").trim()) * 1.3;
          const productId = product.find('a.btnQV').attr('data-product-id');
          // console.log(productId, productTitle, productImage, productPrice);
          productText = productId+'|'+productImage+'|'+productTitle+'|'+productPrice;
        }
        else {return false;}

      
        // 
      });

     // const docs = await loader.load();
    //   console.log(docs)
    //   return JSON.stringify({
    //     fragancename,
    //     price: 45,
        
    //   });
    return productText;
    // return docs;
    
  }
  export { get_fragance_from_supplier };