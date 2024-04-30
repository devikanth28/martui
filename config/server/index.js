import compression from 'compression';
import express from 'express';
import renderer from './renderer';
import path from 'path';





const app = express();
app.use(compression());
app.use(express.static(path.resolve(process.cwd(), 'public/client')));




app.get("/*" , function(req, res, next){
    try{
        if(req.query['utm_campaign'] !== undefined && (req.query['utm_campaign'].toLowerCase().indexOf('medplusadvantage') !== -1  || req.query['utm_campaign'].toLowerCase().indexOf("medplusdiagnostics") !== -1 ) && req.url.indexOf("medplusCampaign") === -1){
            let url = req.url;
            if((url !== "" && url !== null) && url.startsWith("/") && url.indexOf("?") !== -1){
                url = url.substring(1);
                let requestUrl = url.split("?")[0];
                if(requestUrl.startsWith("/"))
                    requestUrl = requestUrl.substring(1);
                let queryUrl = url.split("?")[1];
                res.redirect("/medplusCampaign?"+queryUrl+"&requestedPage="+requestUrl);
            }
        }else{
            next();
        }
    }catch(err){
        next();
    }
});

app.get("/product/:productName/:productId", function(req, res, next){
    if(req.params.productId !== null && req.params.productName !== null){
        res.redirect("/product/"+req.params.productName+"_"+req.params.productId);
    }else{
        next();
    }
});

app.get("/*", renderer);

app.listen(process.env.port, () => {
    console.log(`Server is running on port : ${process.env.port}`);
});