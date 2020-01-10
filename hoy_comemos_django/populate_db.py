import os
# Configure settings for project
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE','hoy_comemos_django.settings')

import django
# Import settings
django.setup()

from app.models import Meal

meals = [
    (1, 'pittige varkenhaas', 'carne', '', '', '', '', 0),
    (2, 'pasta con carne', 'pasta', '', '', '', '', 0),
    (3, 'carne con tomate', 'carne', '- 2 botes de tomate triturado + 1/2 pimiento verde + 1/2 pimiento rojo + 1/2 cebolla cortados grandes - 500 g. de carne (hacheevlees) - Dejar calentar 2h aprox echandole un vaso de agua cuando se quede seco (aprox. 6)', '', '', '', 0),
    (4, 'lentejas', 'guiso', 'Ingredientes - 500 g. lentejas - 1 cebolla pelada sin cortar  - 2 ajos pelados - 1 zanahoria pelada - 2 hojas laurel - 1 avecren - 1 pimiento verde cortado en 2 trozos y sin el corazon - 2 tomates lavados sin pelar, cortados en 2 trozos - 1 cucharadita pimenton dulce -1/4 cucharadita pimenton picante - 1 chorreon de aceite - 1 chorizo - Sal - Pimienta negra - Comino  Pasos - Ponemos todos los ingredientes en la cacerola y lo cubrimos de agua. - Ponemos a fuego rapido hasta que empiece a hervir. - Despues a fuego lento, alrededor de 1/2 hora - Cuando las lentejas esten blandas, sacar los condimentos y pasarlos por la batidora  Comentarios - Salen muchas lentejas - Me pase con el agua al final, tuve que echarle pan - No tenian mucho sabor  > Probar con 250g. y los mismos ingredientes', '', '', '', 0),
    (5, 'pasta con salmon', 'pasta', '', '', '', '', 0),
    (6, 'pastel de ajo', 'especial', '', '', '', '', 0),
    (7, 'pasta con pesto rojo', 'pasta', '- 200g tomates secos - 20g. basilico - 1 ajo - 75g. parmesano - 4 cucharas pinones - 4 cucharas balsamico - 6 cucharas aceite.', '', '', '', 0),
    (8, 'pasta con pesto verde', 'pasta', '', '', '', '', 0),
    (9, 'hamburguesas', 'carne', '', '', '', '', 0),
    (10, 'lasagna', 'pasta', '', '', '', '', 0),
    (11, 'tortilla de patata', 'especial', '', '', '', '', 0),
    (12, 'salmon', 'pescado', '', '', '', '', 0),
    (13, 'pasta carbonara', 'pasta', '', '', '', '', 0),
    (14, 'garbanzos con gambas', 'guiso', '-Echa en la sartén 1/2 cebolla troceada, 1 diente de ajo cortados en rodajas, 1/2 pimiento rojo y 1/2 pimiento verde.   Echa también 1 cucharada pequeña de pimentón dulce y una hoja de laurel.Deja a fuego medio estén bien tiernos, aprox 1 hora. Despues echa el sofrito en el vaso de la batidora y tritura.  - Echa un bote de garbanzos en agua (400 g) en una olla cubierto de agua caliente con un avecren y el sofrito triturado. Despues de un momento, echa 200g. de gambas. Dejarlo 5min.  + Los langostinos no estaban hechos, habria que hacerlos antes.', '', '', '', 0),
    (15, 'kipsate', 'carne', '', '', '', '', 0),
    (16, 'papas con chocos', 'guiso', '', '', '', 'https://www.google.com/amp/s/www.javirecetas.com/papas-con-choco/amp/', 0),
    (17, 'garbanzos con pescado', 'guiso', '', '', '', '', 0),
    (20, 'guisantes con pescado', 'verduras', '', '', '', 'https://www.javirecetas.com/pescado-en-amarillo/', 0),
    (21, 'garbanzos con chorizo', 'guiso', '', '', '', '', 0),
    (23, 'atun', 'pescado', '', '', '', '', 0),
    (54, 'Tortitas americanas', 'postre', '', 'baja', 'baja', 'http://www.gutamama.com/2014/03/tortitas-americanas-o-pancakes.html?m=1', 0),
    (25, 'rissoto', 'pasta', '', '', '', '', 0),
    (26, 'carbonara al curry', 'pasta', '', '', '', 'http://javirecetas.hola.com/carbonara-al-curry/', 0),
    (27, 'mouse chocolate negro', 'postre', '', '', '', 'http://javirecetas.hola.com/mousse-de-chocolate-negro/', 0),
    (28, 'risotto gambas', 'pasta', '', '', '', 'http://javirecetas.hola.com/risotto-de-gambas-y-esparragos/', 0),
    (29, 'merluza en salsa verde', 'pescado', '', '', '', 'http://javirecetas.hola.com/merluza-en-salsa-verde/', 0),
    (30, 'merluza en salsa', 'pescado', '', '', '', 'http://javirecetas.hola.com/merluza-en-salsa/', 0),
    (31, 'bonito con tomate', 'pescado', '', '', '', 'http://elcomidista.elpais.com/elcomidista/2011/08/25/articulo/1314248400_131424.html', 0),
    (32, 'tarta de santiago', 'postre', '', '', '', 'http://javirecetas.hola.com/tarta-de-santiago/', 0),
    (33, 'tiramisu', 'postre', '', '', '', 'https://www.directoalpaladar.com/postres/como-hacer-tiramisu-casero-receta', 0),
    (34, 'pasta con gambas y pesto verde', 'pasta', '', '', '', 'http://elcomidista.elpais.com/elcomidista/2010/10/13/receta/1286949600_128694.html', 0),
    (35, 'brocheta de pollo con salsa agridulce', 'carne', '', '', '', 'http://www.consumer.es/web/es/alimentacion/recetas/2003/02/24/58044.php', 0),
    (52, 'caballa', 'pescado', '', '', '', '', 0),
    (37, 'solomillo al whiski', 'carne', '', '', '', 'http://javirecetas.hola.com/solomillo-al-whisky/', 0),
    (39, 'suddervlees met frites', 'carne', '', '', '', 'https://www.ah.nl/allerhande/recept/R-R591756/suddervlees-met-frites;WLSESSIONID=PdNwxBQKYbzV4IlU3H_MKvRSpSqFKOg9EdVBJHsgafiXmpppoJbd!2135815550?_requestid=7279938', 0),
    (40, 'notentaar', 'postre', '', '', '', 'https://www.ah.nl/allerhande/recept/R-R869432/intense-notentaart?returnId=591756&_requestid=7280222', 0),
    (41, 'rollo de roquefort y jamon york', 'especial', '', '', '', 'http://pandora-lacocinadepandora.blogspot.nl/2010/08/rollo-de-roquefort-con-jamon-york.html', 0),
    (42, 'arroz con pollo', 'guiso', '', '', '', 'http://javirecetas.hola.com/arroz-con-pollo/', 0),
    (43, 'entrecot con patatas a las finas hierbas', 'carne', '', 'media', 'alta', 'https://www.youtube.com/watch?v=nQxUNwbShSg', 0),
    (44, 'sushi', 'especial', '', 'media', 'alta', 'https://www.youtube.com/watch?v=4k6YxVEaIPk', 0),
    (45, 'dorada a la sal', 'pescado', '', 'baja', 'media', 'http://javirecetas.hola.com/dorada-a-la-sal/', 0),
    (47, 'garbanzos con langostinos', 'guiso', '', '', '', 'http://javirecetas.hola.com/garbanzos-con-langostinos/', 0),
    (48, 'mini gehakte empanadas', 'especial', '', '', '', 'https://www.jumbo.com/mini-gehaktempanada\'s/501144/', 0),
    (49, 'mac and cheese', 'pasta', '', 'media', 'alta', 'https://www.buzzfeed.com/adambianchi/terry-crews-took-over-the-tasty-kitchen-and-made-his-famous?bffbtasty&ref=bffbtasty&utm_term=.cvm9PmAon#.nlMy0E7XP', 0),
    (50, 'goulash', 'carne', '', 'media', 'media', 'https://www.jumbo.com/klassieke-goulash/500602/', 0),
    (51, 'puchero', 'guiso', '', '', '', 'http://javirecetas.hola.com/puchero-gaditano/', 0),
    (53, 'Pastel de chocolate', 'postre', '', '', '', '', 0),
    (55, 'Arroz con garbanzos y carrillera alioli', 'guiso', '', 'baja', 'baja', 'http://elcomidista.elpais.com/elcomidista/2014/10/02/articulo/1412226000_141222.html', 0),
    (56, 'Mejillones con chile', 'especial', '', 'baja', 'baja', 'http://elcomidista.elpais.com/elcomidista/2016/10/11/receta/1476222023_811675.html', 0),
    (57, 'Tarta de queso japonesa', 'postre', '', 'baja', 'baja', 'http://elcomidista.elpais.com/elcomidista/2016/10/19/receta/1476906514_131989.html', 0),
    (59, 'pizza', 'pizza', '', '', '', '', 0),
    (60, 'pasta con tomate y albondigas', 'pasta', '', '', '', '', 0),
    (61, 'GARBANZOS CON ESPINACAS, PASAS, PIÑONES Y BUTIFARRA', 'verduras', '- 600 g de garbanzos\r\n- 600 g de espinacas frescas\r\n- 150 g de butifarra cocida al gusto (blanca, negra o mezclada)\r\n- 40 g de piñones\r\n- 40 g de pasas\r\n- 1 cebolla\r\n- 1 tomate de pera\r\n- 2 dientes de ajo\r\n- 100 ml de vino blanco\r\n- Aceite de oliva\r\n- Sal', '', '', 'https://elcomidista.elpais.com/elcomidista/2017/09/06/receta/1504714097_855223.html#bloque_comentarios', 1),
    (62, 'GUISO DE SEPIA CON GARBANZOS', 'guiso', '- 1 sepia de unos 500 g, limpia pero con la melsa\r\n- 400 g de garbanzos cocidos\r\n- 2 pimientos verdes\r\n- 1 puerro grande\r\n- 300 g de tomate triturado\r\n- 1 diente de ajo\r\n- 100 ml de vino blanco\r\n- 2 cucharadas de perejil picado\r\n- Aceite de oliva\r\n- Sal', '', '', 'https://elcomidista.elpais.com/elcomidista/2017/02/08/receta/1486577209_015421.html', 1),
    (63, 'PASTA CON HINOJO Y SARDINILLAS', 'pasta', '- 280 g de pasta\r\n- Un bulbo de hinojo\r\n- Una lata de sardinillas (2 filetes de sardina o 2 sardinillas por persona)\r\n- 30 g de mantequilla\r\n- El zumo de medio limón\r\n- Un puñado de piñones\r\n- Unas ramitas de hierba del bulbo de hinojo\r\n- 2/3 cucharadas soperas de aceite de oliva\r\n- Sal\r\n- Pimienta', '', '', 'https://elcomidista.elpais.com/elcomidista/2018/04/17/receta/1523979007_596013.html', 1),
    (64, 'Lasagne met ham, ricotta en spinazie', 'pescado', '- 900 g diepvries gesneden bladspinazie in deelblokjes\r\n- 15 g verse basilicum\r\n- 30 g verse krulpeterselie\r\n- 100 g Parmezaanse kaas\r\n- 450 g ricotta\r\n- 250 g verse lasagne all’uovo\r\n- 250 g achterham', '', '', 'https://www.ah.nl/allerhande/recept/R-R1192429/lasagne-met-ham-ricotta-en-spinazie', 0),
    (65, 'Sticky drumsticks', 'carne', '- 2 tenen knoflook\r\n- 1 el vloeibare honing\r\n- 1½ el ketchup\r\n- 1½ el Kikkoman sojasaus\r\n- 1 tl chilivlokken\r\n- 1 kg kipdrumstick\r\n', '', '', 'https://www.ah.nl/allerhande/recept/R-R1192605/sticky-drumsticks-uit-de-oven', 1),
    (66, 'Gebakken sliptong met zelfgemaakt visspecerij', 'pescado', '- 8 verse sliptongfilets\r\n- 100 g zout\r\n- 2 el gedroogde dille\r\n- 1½ tl gemalen witte peper\r\n- 1 tl gemalen kurkuma (koenjit)\r\n- 1 tl gemalen foelie\r\n- 1 tl gemberpoeder\r\n- ½ tl gemalen koriander (ketoembar)\r\n- 100 g tarwebloem\r\n- 10 g verse bieslook\r\n- 1½ citroen\r\n- 90 g ghee\r\n', '', '', 'https://www.ah.nl/allerhande/recept/R-R1192613/gebakken-sliptong-met-zelfgemaakt-visspecerijenzout', 1),
    (67, 'Penne alla puttanesca', 'pasta', '- 300 g penne\r\n- 1 rode peper\r\n- 2 tenen knoflook\r\n- 5 trostomaten\r\n- 3 el milde olijfolie\r\n- 120 g zwarte olijven zonder pit\r\n- 100 g kappertjes\r\n', '', '', 'https://www.ah.nl/allerhande/recept/R-R733274/penne-alla-puttanesca', 0),
    (68, 'Brabants worstenbrood van Houben', 'carne', '- 40 g ongezouten roomboter\r\n- 220 g tarwebloem\r\n- ½ tl kristalsuiker\r\n- 7 g gedroogde gist\r\n- 100 ml volle melk\r\n- 1 tl zout\r\n- 400 g half om half gehakt\r\n- 1 el paneermeel\r\n- 2 middelgrote eieren\r\n- ½ tl gemalen nootmuskaat\r\n- ½ tl zwarte peper\r\n- 1 el kraanwater\r\n', '', '', 'https://www.ah.nl/allerhande/recept/R-R1192622/brabants-worstenbrood-van-houben', 0),
    (69, 'Aardbeientiramisu met sinaasappel', 'postre', '- 1 perssinaasappel\r\n- 4 el sinaasappellikeur\r\n- 40 lange vingers\r\n- 500 g aardbeien\r\n- 15 g verse basilicum\r\n- 500 ml verse slagroom\r\n- 4 el fijne kristalsuiker\r\n- 1 vanillestokje\r\n- 500 g mascarpone\r\n', '', '', 'https://www.ah.nl/allerhande/recept/R-R1192562/aardbeientiramisu-met-sinaasappel', 1),
    (70, 'Arnhemse meisjes', 'postre', '- 1 citroen\r\n- 190 g tarwebloem\r\n- 100 ml halfvolle melk\r\n- 2 g gedroogde gist\r\n- 105 g ongezouten roomboter\r\n- ¼ tl zout\r\n- 200 g ruwe rietsuiker\r\n', '', '', 'https://www.ah.nl/allerhande/recept/R-R1192574/arnhemse-meisjes-van-bakker-jurjus', 0),
    (71, 'Pastel de espinacas', 'verduras', '', '', '', '', 0),
    (72, 'pastel de verduras', 'verduras', '', '', '', '', 0),
    (73, 'risotto de espinacas', 'verduras', '', '', '', '', 0),
    (74, 'albondigas a la jardinera', 'verduras', '', '', '', '', 0),
    (75, 'pescado con crema de calabacin', 'verduras', '', '', '', '', 0)
]

def populate(mealsList):
    '''
    Create N Entries of Dates Accessed
    '''
    for i in range(len(mealsList)):

        meal = mealsList[i]
        name = meal[1]
        print(name)
        category = meal[2]
        ingredients = meal[3]
        complexity = meal[4]
        duration = meal[5]
        link = meal[6]
        is_new = meal[7]
        image_name = createMealImage(name)

        # Create new Meal Entry
        mealEntry = Meal.objects.get_or_create(name=name, category=category, ingredients=ingredients, complexity=complexity, duration=duration,link=link,is_new=is_new, image_name = image_name)[0]

def createMealImage(name):
    charsToReplace = [" a la ", " a las ", " y "," con "," al "," met "," de "," la "," las "," en ", " a ", " and ", " "];
    imageName = name.lower()

    for char in charsToReplace:
        imageName = imageName.replace(char,'_')

    imageName = imageName + '.jpg'

    return imageName

if __name__ == '__main__':
    print("Populating the databases...Please Wait")
    populate(meals)
    print('Populating Complete')
