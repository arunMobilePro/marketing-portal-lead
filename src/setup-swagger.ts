import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

/*
uncomment for generate API docs 
import converter from 'widdershins';
import { readFileSync, writeFileSync } from 'fs';
*/

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Marketing Portal Lead API')
    .setVersion('0.1')
    .addBearerAuth()
    .addOAuth2()
    .setDescription('Marketing Portal Lead API')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // Uncomment for generate API docs
  /*const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });
  writeFileSync('./swagger-spec.json', JSON.stringify(document));
  const optionsConvert = {
    codeSamples: true,
    httpsnippet: false,
    templateCallback: function (templateName, stage, data) {
      return data;
    },
    language_tabs: [
      { http: 'HTTP' },
      { javascript: 'JavaScript' },
      { 'javascript--node': 'Node.JS' },
    ],
    theme: 'darkula',
    search: true,
    sample: true,
    discovery: false,
    includes: [],
    shallowSchemas: false,
    tocSummary: false,
    headings: 2,
    yaml: false,
  };
  const apiObj = JSON.parse(readFileSync('./swagger-spec.json').toString());
  converter.convert(apiObj, optionsConvert).then((str) => {
    writeFileSync('marketing-portal-backend-api-docs.md', str, 'utf8');
  });
*/
  SwaggerModule.setup('docs', app, document);
}