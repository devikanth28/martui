
const dotenv = require('dotenv');
const filePath = require('path');
const fs = require('fs');


dotenv.config({
    path: filePath.resolve(process.cwd(), '.env.production')
});


const isValidExtension = (uri) => {

    const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp'];
    const ext = filePath.extname(uri);
    if (!ext && !extensions.indexOf(ext) < -1) {
        return false;
    }

    return true;

}

const processURI = (uri) => {
    if (!uri) {
        return uri;
    }

    if (uri.indexOf("/images/") == -1) {
        return;
    }

    return extractAssest(uri.split("/images/")[1]);
}


const extractAssest = (uri) => {
    try {
        let manifestFilePath = filePath.resolve(process.cwd(), 'public/client', 'client-assets-manifest.json');
        if (!fs.existsSync(manifestFilePath)) {
            return `${process.env.ASSETS_URL}images/${uri}`
        }
        const fileName = uri.split("/").pop();
        manifest = JSON.parse(fs.readFileSync(manifestFilePath));
        const imagePath = manifest[`assets/${fileName}`];
        if (!imagePath) {
            return `${process.env.ASSETS_URL}images/${uri}`
        }
        return `${process.env.ASSETS_URL}${imagePath.substring(1, imagePath.length)}`;
    } catch (error) {
        return `${process.env.ASSETS_URL}images/${uri}`
    }

}





require('@babel/register')({
    ignore: [
        /\/(public|node_modules)\//
    ],
    plugins: [["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties"],
        ["css-modules-transform"],
    [function assetsTransformation(babel) {
        const { types } = babel;
        return {
            name: "assets-transformation",
            visitor: {
                ImportDeclaration(path) {

                    let uri = path.node.source.value;
                    if (!isValidExtension(uri)) {
                        return;
                    }

                    uri = processURI(uri);

                    if (!uri) {
                        return;
                    }
                    const variableName = path.node.specifiers && path.node.specifiers[0] && path.node.specifiers[0].local && path.node.specifiers[0].local.name;
                    if (!variableName) {
                        return;
                    }
                    path.replaceWith(
                        types.variableDeclaration("const", [
                            types.variableDeclarator(
                                types.identifier(variableName),
                                types.StringLiteral(uri)
                            )
                        ])
                    );
                },
                CallExpression(path) {
                    const callee = path.get("callee");

                    if (!callee.isIdentifier() || !callee.equals("name", "require")) {
                        return;
                    }
                    const argument = path.get("arguments")[0];

                    if (!argument || !argument.isStringLiteral()) {
                        return;
                    }

                    let uri = argument.node.value;
                    if (!isValidExtension(uri)) {
                        return;
                    }

                    uri = processURI(uri);
                    if (!uri) {
                        return;
                    }

                    path.replaceWith(types.StringLiteral(uri));
                }
            }
        };

    }]

    ],
    presets: ["@babel/preset-env", "@babel/preset-react"],
});

require("./index");

