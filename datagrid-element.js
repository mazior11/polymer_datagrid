import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import CTable from "./c-table";
/**
 * `datagrid-element`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DatagridElement extends PolymerElement {
  static get template() {
    return html`
      <style>
      </style>
      <c-table 
        data={{data}}
        gridConfiguration={{gridConfiguration}}
        autoPaging
        auto-generate-columns 
        columns={{columns}}>
      </c-table>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'datagrid-element',
      },
      gridConfiguration: {
        type: Object,
        value: {
          id: "myGrid",
          url: "http://localhost:4001/users",
          urlCompile: (conf) => `http://${conf.url}?page=${conf.page}`
        }
      },
      columns: {
        type: "Array",
        value: [
          {
            id: 'id',
            header: 'Id',
            html: (obj) => `My id is ${obj.id}`
          },
          {
            id: 'firstName',
            header: 'First Name',
            html: (obj) => `<input type="button" value="${obj.firstName}"/>`
          }
        ]
      },
      data: {
        type: "Array",
        value:
          [
            {
              "id": 12090059,
              "firstName": "Nicole",
              "secondName": "Ayden",
              "lastName": "Jaskolski",
              "city": "Billyberg",
              "streetAddress": "756 Drew Locks",
              "phone": "1-658-383-9001",
              "email": "Bobbie19@yahoo.com",
              "currencyName": "Dong",
              "currencyCode": "CUP CUC",
              "currencySymbol": "$",
              "account": "75370876",
              "accountName": "Savings Account",
              "bitcoinAddress": "16TEGGNM2HL0TJOHV9X7NWF28DA0"
            },
            {
              "id": 52333184,
              "firstName": "Concepcion",
              "secondName": "Sonia",
              "lastName": "Hoeger",
              "city": "East Ofelia",
              "streetAddress": "330 Donavon Plain",
              "phone": "(041) 864-6430 x3402",
              "email": "Hattie20@yahoo.com",
              "currencyName": "Taka",
              "currencyCode": "HRK",
              "currencySymbol": "kr",
              "account": "13576423",
              "accountName": "Home Loan Account",
              "bitcoinAddress": "1HB8GCQLDP5IRHIU8HYXEFRRF9V"
            },
            {
              "id": 90681042,
              "firstName": "Diamond",
              "secondName": "Pauline",
              "lastName": "McKenzie",
              "city": "North Vellaport",
              "streetAddress": "944 Crona Isle",
              "phone": "(419) 500-4774",
              "email": "Emerson13@yahoo.com",
              "currencyName": "Dong",
              "currencyCode": "TWD",
              "currencySymbol": "L",
              "account": "46705558",
              "accountName": "Personal Loan Account",
              "bitcoinAddress": "1VMNXADV8ICDFBYNEMO3UA621PUZMVH7R3"
            },
            {
              "id": 97891199,
              "firstName": "Ethelyn",
              "secondName": "Darion",
              "lastName": "Huels",
              "city": "South Victoriamouth",
              "streetAddress": "439 Greenfelder Flats",
              "phone": "196.890.1479 x4235",
              "email": "Eriberto68@hotmail.com",
              "currencyName": "Guyana Dollar",
              "currencyCode": "GYD",
              "currencySymbol": "p.",
              "account": "73845445",
              "accountName": "Checking Account",
              "bitcoinAddress": "3M5B2JABEKIQ5JC7QMK56W2TBZ8K0J"
            },
            {
              "id": 14484755,
              "firstName": "Winifred",
              "secondName": "Crawford",
              "lastName": "Will",
              "city": "Lake Bartonbury",
              "streetAddress": "787 Lambert Lodge",
              "phone": "1-470-267-0331 x667",
              "email": "Dejah73@gmail.com",
              "currencyName": "SDR",
              "currencyCode": "STD",
              "currencySymbol": "лв",
              "account": "83960085",
              "accountName": "Savings Account",
              "bitcoinAddress": "109A17F1161EI1DNE9QMHBFHFDU3BZYS"
            },
            {
              "id": 34632058,
              "firstName": "Arjun",
              "secondName": "Guido",
              "lastName": "Koepp",
              "city": "Collinside",
              "streetAddress": "70734 Willms Neck",
              "phone": "(260) 699-3567",
              "email": "Jasper85@hotmail.com",
              "currencyName": "Lek",
              "currencyCode": "RUB",
              "currencySymbol": "J$",
              "account": "78864177",
              "accountName": "Credit Card Account",
              "bitcoinAddress": "1SYRCIXA2X7BVM1T1AW728TMSMYZ36U1I"
            },
            {
              "id": 81539003,
              "firstName": "Vaughn",
              "secondName": "Ryleigh",
              "lastName": "Kuvalis",
              "city": "Freidaport",
              "streetAddress": "36351 Vernice Cape",
              "phone": "1-226-448-5566",
              "email": "Gerard.Wyman19@gmail.com",
              "currencyName": "Syrian Pound",
              "currencyCode": "SDG",
              "currencySymbol": "₨",
              "account": "17304884",
              "accountName": "Credit Card Account",
              "bitcoinAddress": "1LKEESTWXDEXYA4ZJ2L44OZQJWIELW"
            },
            {
              "id": 40849014,
              "firstName": "Monte",
              "secondName": "Van",
              "lastName": "Fritsch",
              "city": "Lake Brandynstad",
              "streetAddress": "1416 Heaney Rest",
              "phone": "335-601-1238 x1830",
              "email": "Bridget_Douglas@gmail.com",
              "currencyName": "Bond Markets Units European Composite Unit (EURCO)",
              "currencyCode": "IRR",
              "currencySymbol": "$",
              "account": "48937820",
              "accountName": "Checking Account",
              "bitcoinAddress": "1F268J90XH6HUJLV0DPI1XEFZGD96OTVT3"
            },
            {
              "id": 34902367,
              "firstName": "Vito",
              "secondName": "Isabelle",
              "lastName": "Walker",
              "city": "Enriqueton",
              "streetAddress": "36135 Mariano Cove",
              "phone": "077.132.8276 x14372",
              "email": "Dominic90@hotmail.com",
              "currencyName": "Dalasi",
              "currencyCode": "KRW",
              "currencySymbol": "ƒ",
              "account": "40433455",
              "accountName": "Checking Account",
              "bitcoinAddress": "1CW7MEDZ3VCIYP5LUIRSIW4YIV46H4"
            },
            {
              "id": 85785336,
              "firstName": "Noemie",
              "secondName": "Tristin",
              "lastName": "Sawayn",
              "city": "Fisherton",
              "streetAddress": "529 Swaniawski Spring",
              "phone": "(813) 985-1006 x431",
              "email": "Sincere.Douglas@hotmail.com",
              "currencyName": "Djibouti Franc",
              "currencyCode": "BAM",
              "currencySymbol": "Ft",
              "account": "70129392",
              "accountName": "Personal Loan Account",
              "bitcoinAddress": "15BUN8OYVDEB8QDIQYXLXGJ78G9ZQW6"
            },
            {
              "id": 92100942,
              "firstName": "Kory",
              "secondName": "Van",
              "lastName": "Tillman",
              "city": "South Zoeyberg",
              "streetAddress": "596 Ebert Summit",
              "phone": "165.554.3521 x57992",
              "email": "Alessandra_Metz67@yahoo.com",
              "currencyName": "Argentine Peso",
              "currencyCode": "IQD",
              "currencySymbol": "₮",
              "account": "20884828",
              "accountName": "Auto Loan Account",
              "bitcoinAddress": "3FP68MUVBUJHYCYM6KRTL765I620"
            },
            {
              "id": 22822310,
              "firstName": "Hailie",
              "secondName": "Jailyn",
              "lastName": "Denesik",
              "city": "West Donato",
              "streetAddress": "767 Kulas Divide",
              "phone": "1-226-294-8826",
              "email": "Sebastian5@yahoo.com",
              "currencyName": "Sri Lanka Rupee",
              "currencyCode": "BBD",
              "currencySymbol": "R$",
              "account": "47647175",
              "accountName": "Home Loan Account",
              "bitcoinAddress": "39I1R7SN7B48X7H32KY3ZX34LY8N404"
            },
            {
              "id": 77429780,
              "firstName": "Brigitte",
              "secondName": "Zack",
              "lastName": "Smith",
              "city": "Murazikland",
              "streetAddress": "573 King Mall",
              "phone": "010.834.6451 x701",
              "email": "Audreanne_Shields30@yahoo.com",
              "currencyName": "Dobra",
              "currencyCode": "XAU",
              "currencySymbol": "$",
              "account": "34027150",
              "accountName": "Investment Account",
              "bitcoinAddress": "1IKIEHVTEHOLZLK1D61M4VH0ZQJQ5Y3"
            },
            {
              "id": 69780887,
              "firstName": "Cortney",
              "secondName": "Emely",
              "lastName": "Waelchi",
              "city": "Schustershire",
              "streetAddress": "149 Heaney Knoll",
              "phone": "(234) 001-7556",
              "email": "Arnulfo_McKenzie98@yahoo.com",
              "currencyName": "Jordanian Dinar",
              "currencyCode": "SAR",
              "currencySymbol": "Lt",
              "account": "75551269",
              "accountName": "Credit Card Account",
              "bitcoinAddress": "1MW92AIYZYXLZY37310O857HDSZ95IL"
            },
            {
              "id": 79144414,
              "firstName": "Garett",
              "secondName": "Everett",
              "lastName": "Schmitt",
              "city": "East Hellenchester",
              "streetAddress": "556 Dashawn Run",
              "phone": "(375) 380-4253 x650",
              "email": "Santiago.Turcotte@hotmail.com",
              "currencyName": "Peso Uruguayo Uruguay Peso en Unidades Indexadas",
              "currencyCode": "MZN",
              "currencySymbol": "៛",
              "account": "91999186",
              "accountName": "Home Loan Account",
              "bitcoinAddress": "37CU6C32TVJFFVPS5NJY75X6BVV"
            },
            {
              "id": 51566994,
              "firstName": "Stewart",
              "secondName": "Deondre",
              "lastName": "Windler",
              "city": "Grahamborough",
              "streetAddress": "4710 Bayer Spurs",
              "phone": "(560) 133-4809 x239",
              "email": "Rhiannon.Lemke@gmail.com",
              "currencyName": "Brunei Dollar",
              "currencyCode": "XPF",
              "currencySymbol": "Php",
              "account": "57850536",
              "accountName": "Personal Loan Account",
              "bitcoinAddress": "1XFXU6VDHJVVP61FRRAOJO1MIGMPQ"
            },
            {
              "id": 11288980,
              "firstName": "Stephany",
              "secondName": "Torrey",
              "lastName": "King",
              "city": "Annefort",
              "streetAddress": "414 Helena Views",
              "phone": "(284) 819-3583",
              "email": "Shyann_Shanahan24@yahoo.com",
              "currencyName": "European Unit of Account 9(E.U.A.-9)",
              "currencyCode": "BHD",
              "currencySymbol": "$",
              "account": "80086331",
              "accountName": "Investment Account",
              "bitcoinAddress": "3YTHV3LJY11UEYDZVOYK1X1LRQC3569"
            },
            {
              "id": 830787,
              "firstName": "Emmalee",
              "secondName": "Jennyfer",
              "lastName": "Jenkins",
              "city": "Gutmannhaven",
              "streetAddress": "1900 Patrick Dam",
              "phone": "518-265-0433",
              "email": "Hadley.Brakus71@hotmail.com",
              "currencyName": "Fiji Dollar",
              "currencyCode": "AFN",
              "currencySymbol": "₩",
              "account": "99089847",
              "accountName": "Personal Loan Account",
              "bitcoinAddress": "1EKDA32K2PJCBNBWC6CY3ODOONR"
            },
            {
              "id": 73063597,
              "firstName": "Favian",
              "secondName": "Bret",
              "lastName": "Thompson",
              "city": "North Berneice",
              "streetAddress": "752 Eryn Ramp",
              "phone": "434-884-1690 x6954",
              "email": "Logan_Mante88@yahoo.com",
              "currencyName": "European Monetary Unit (E.M.U.-6)",
              "currencyCode": "UZS",
              "currencySymbol": "kr",
              "account": "16338747",
              "accountName": "Money Market Account",
              "bitcoinAddress": "3QPA21V8KF1XXP04YK3B5V5GXT5Z"
            },
            {
              "id": 57451839,
              "firstName": "Gregoria",
              "secondName": "Mara",
              "lastName": "Fritsch",
              "city": "Lake Liaport",
              "streetAddress": "4435 Gonzalo Light",
              "phone": "706-115-5839",
              "email": "Leola_Murazik68@gmail.com",
              "currencyName": "Guinea Franc",
              "currencyCode": "BYR",
              "currencySymbol": "$",
              "account": "78670837",
              "accountName": "Money Market Account",
              "bitcoinAddress": "33NQUUHPSR6F7I3L7GNEIS1WDXOZLRPQ"
            },
            {
              "id": 31496151,
              "firstName": "Verner",
              "secondName": "Domenic",
              "lastName": "D'Amore",
              "city": "Pacochafort",
              "streetAddress": "5364 Dorian Mission",
              "phone": "131.171.8611 x34152",
              "email": "Rosalee41@yahoo.com",
              "currencyName": "Iranian Rial",
              "currencyCode": "MRO",
              "currencySymbol": "zł",
              "account": "73650679",
              "accountName": "Investment Account",
              "bitcoinAddress": "1NIIX9SLDGTOKNIIPQZ9SOUWFRVSC5R7W"
            },
            {
              "id": 83059268,
              "firstName": "Camila",
              "secondName": "Sonny",
              "lastName": "Gleichner",
              "city": "Kuvalisfort",
              "streetAddress": "8135 Grady Rest",
              "phone": "030.676.9359",
              "email": "Tiana.Stokes56@yahoo.com",
              "currencyName": "Moldovan Leu",
              "currencyCode": "VEF",
              "currencySymbol": "$",
              "account": "79230865",
              "accountName": "Savings Account",
              "bitcoinAddress": "10LQ7X8ZKNRFPMWL63R4MQW2CQ51"
            },
            {
              "id": 60943665,
              "firstName": "Creola",
              "secondName": "Travon",
              "lastName": "Mayert",
              "city": "Yosthaven",
              "streetAddress": "833 Coty Locks",
              "phone": "(766) 895-5203 x9509",
              "email": "Mina_Renner@hotmail.com",
              "currencyName": "Fiji Dollar",
              "currencyCode": "AUD",
              "currencySymbol": "RM",
              "account": "10712324",
              "accountName": "Checking Account",
              "bitcoinAddress": "1KRBWRW7T3767OPR64JM2NF4Q1KFB0RC4F"
            },
            {
              "id": 73548792,
              "firstName": "Harvey",
              "secondName": "Ellis",
              "lastName": "Lynch",
              "city": "MacGyverfort",
              "streetAddress": "07572 Noemy Views",
              "phone": "085.166.5258 x5270",
              "email": "Raphaelle.Purdy@hotmail.com",
              "currencyName": "Manat",
              "currencyCode": "SRD",
              "currencySymbol": "₨",
              "account": "88734393",
              "accountName": "Credit Card Account",
              "bitcoinAddress": "1XFTERVL4IAKYJKTLM2SKBLOC0U419E"
            },
            {
              "id": 89936863,
              "firstName": "Jaime",
              "secondName": "Shana",
              "lastName": "Abernathy",
              "city": "New Earl",
              "streetAddress": "3020 Bergstrom Green",
              "phone": "945.488.0713 x5844",
              "email": "Chanel27@gmail.com",
              "currencyName": "Indian Rupee Ngultrum",
              "currencyCode": "MDL",
              "currencySymbol": "kr",
              "account": "56842313",
              "accountName": "Investment Account",
              "bitcoinAddress": "3DCFS9FI9V3IM145D2DOU5QCEVP2UM6XJ"
            },
            {
              "id": 90603417,
              "firstName": "Cheyanne",
              "secondName": "Jordyn",
              "lastName": "Toy",
              "city": "Wisokyburgh",
              "streetAddress": "35361 Walsh View",
              "phone": "1-779-987-5253 x451",
              "email": "Erika.Armstrong@gmail.com",
              "currencyName": "Baht",
              "currencyCode": "PGK",
              "currencySymbol": "₭",
              "account": "97632038",
              "accountName": "Credit Card Account",
              "bitcoinAddress": "13MA28LZJLJGA3O4I945NT0OSH4EFNGT"
            },
            {
              "id": 63383108,
              "firstName": "Marco",
              "secondName": "Frederick",
              "lastName": "Bahringer",
              "city": "East Horacemouth",
              "streetAddress": "032 Cruickshank Ridges",
              "phone": "1-985-260-7252 x19422",
              "email": "Emmy_Grimes62@yahoo.com",
              "currencyName": "Danish Krone",
              "currencyCode": "BMD",
              "currencySymbol": "руб",
              "account": "13759909",
              "accountName": "Savings Account",
              "bitcoinAddress": "146GMAWQQP7R4QKWHU7NLIBQNLEVKVLOK"
            },
            {
              "id": 13103975,
              "firstName": "Chelsea",
              "secondName": "Lenna",
              "lastName": "Aufderhar",
              "city": "West Clarkmouth",
              "streetAddress": "2525 Joshua Pike",
              "phone": "1-186-170-1254",
              "email": "Nathanael43@hotmail.com",
              "currencyName": "Palladium",
              "currencyCode": "JOD",
              "currencySymbol": "﷼",
              "account": "43063895",
              "accountName": "Money Market Account",
              "bitcoinAddress": "11KR25XE9FFUAYOSIGFLZ0MBWT9OB0Q61S"
            },
            {
              "id": 77843610,
              "firstName": "Jackie",
              "secondName": "Nathanael",
              "lastName": "Padberg",
              "city": "East Stephanie",
              "streetAddress": "10076 Conroy Coves",
              "phone": "873-025-5672 x830",
              "email": "Maritza_Graham@yahoo.com",
              "currencyName": "Czech Koruna",
              "currencyCode": "USD",
              "currencySymbol": "£",
              "account": "11428453",
              "accountName": "Credit Card Account",
              "bitcoinAddress": "1CDKKMRVOXKGAESBXIB4JOV0ZAGI8K"
            },
            {
              "id": 36226052,
              "firstName": "Lenny",
              "secondName": "Lavada",
              "lastName": "Kemmer",
              "city": "Port Aniyahside",
              "streetAddress": "641 Granville Mills",
              "phone": "919-007-9470 x233",
              "email": "Kaley_Hessel70@yahoo.com",
              "currencyName": "Netherlands Antillian Guilder",
              "currencyCode": "KZT",
              "currencySymbol": "₩",
              "account": "37482751",
              "accountName": "Investment Account",
              "bitcoinAddress": "3TMLBQ1CDSX9FYI86TMOF0NYHGLCFOY"
            },
            {
              "id": 17115886,
              "firstName": "Annabelle",
              "secondName": "Effie",
              "lastName": "Kshlerin",
              "city": "West Jarod",
              "streetAddress": "47322 Brekke Drive",
              "phone": "125-313-9784 x1141",
              "email": "Liza_Kreiger27@hotmail.com",
              "currencyName": "Pakistan Rupee",
              "currencyCode": "BZD",
              "currencySymbol": "₮",
              "account": "19819240",
              "accountName": "Checking Account",
              "bitcoinAddress": "116VI5BE2Q27ST6SS1I5YF7F7WTG1V"
            },
            {
              "id": 51406818,
              "firstName": "Norberto",
              "secondName": "Tina",
              "lastName": "Kub",
              "city": "Gradyport",
              "streetAddress": "7544 Monahan Key",
              "phone": "759.607.0795",
              "email": "Lina76@hotmail.com",
              "currencyName": "CFA Franc BCEAO",
              "currencyCode": "UAH",
              "currencySymbol": "$",
              "account": "40446108",
              "accountName": "Personal Loan Account",
              "bitcoinAddress": "1QWC0DGKBLHLUPJ2KDS7PSNAO374S"
            },
            {
              "id": 96594479,
              "firstName": "Jess",
              "secondName": "Lila",
              "lastName": "Douglas",
              "city": "Kennachester",
              "streetAddress": "5159 Carrie Keys",
              "phone": "985.103.6942 x572",
              "email": "Leo_Wolff63@hotmail.com",
              "currencyName": "Kina",
              "currencyCode": "BHD",
              "currencySymbol": "Kč",
              "account": "68089912",
              "accountName": "Home Loan Account",
              "bitcoinAddress": "1A9XJYEB6W6IY3GMWC6BEQ7D2P48Y"
            },
            {
              "id": 63654428,
              "firstName": "Oral",
              "secondName": "Jewel",
              "lastName": "Larkin",
              "city": "West Virginie",
              "streetAddress": "7420 Olson Grove",
              "phone": "1-761-574-6360 x0667",
              "email": "Donny.Ritchie@yahoo.com",
              "currencyName": "North Korean Won",
              "currencyCode": "TJS",
              "currencySymbol": "RD$",
              "account": "54979832",
              "accountName": "Checking Account",
              "bitcoinAddress": "14TYLG1OKK0Z1GT3ZO7O230NA99A0GWITA"
            },
            {
              "id": 56505234,
              "firstName": "Asa",
              "secondName": "Torrey",
              "lastName": "Gaylord",
              "city": "Domingomouth",
              "streetAddress": "840 Abdul Square",
              "phone": "110.093.1535 x999",
              "email": "Dominique.McKenzie35@yahoo.com",
              "currencyName": "Pataca",
              "currencyCode": "MWK",
              "currencySymbol": "$",
              "account": "65589640",
              "accountName": "Checking Account",
              "bitcoinAddress": "1XFXRWKXP49TLT90B2IKOU88TLBSSL972I"
            },
            {
              "id": 2683279,
              "firstName": "Constantin",
              "secondName": "Manuela",
              "lastName": "Heaney",
              "city": "East Camrenburgh",
              "streetAddress": "0491 Stehr Junctions",
              "phone": "503.987.7657 x150",
              "email": "Rebecca77@yahoo.com",
              "currencyName": "Balboa US Dollar",
              "currencyCode": "PHP",
              "currencySymbol": "P",
              "account": "01242910",
              "accountName": "Checking Account",
              "bitcoinAddress": "1UDJ3ZVFKZVX7NY8NM03B409M12UT"
            },
            {
              "id": 48463043,
              "firstName": "Dawn",
              "secondName": "Joelle",
              "lastName": "Leffler",
              "city": "North Katharinaborough",
              "streetAddress": "0354 Deckow Square",
              "phone": "1-650-415-1023 x8981",
              "email": "Dawn.Eichmann@yahoo.com",
              "currencyName": "Bolivar Fuerte",
              "currencyCode": "USD",
              "currencySymbol": "S",
              "account": "83594283",
              "accountName": "Credit Card Account",
              "bitcoinAddress": "38JQXHJCG8P6FQ5JB2NLWLPI28E1"
            },
            {
              "id": 73697880,
              "firstName": "Candace",
              "secondName": "Maynard",
              "lastName": "Rolfson",
              "city": "Emmerichmouth",
              "streetAddress": "54737 Cole Village",
              "phone": "(102) 434-8535 x38314",
              "email": "Ike_Kub@hotmail.com",
              "currencyName": "UAE Dirham",
              "currencyCode": "IRR",
              "currencySymbol": "﷼",
              "account": "38777125",
              "accountName": "Money Market Account",
              "bitcoinAddress": "1EKNXWXU1WVJ5Z7AOPV35WU7E9OQS"
            },
            {
              "id": 21909165,
              "firstName": "Francesca",
              "secondName": "Axel",
              "lastName": "Greenfelder",
              "city": "New Savannahland",
              "streetAddress": "1058 Claudia Lane",
              "phone": "(073) 718-9274 x52350",
              "email": "Guy.Grady@hotmail.com",
              "currencyName": "Lebanese Pound",
              "currencyCode": "SDG",
              "currencySymbol": "₭",
              "account": "54973735",
              "accountName": "Credit Card Account",
              "bitcoinAddress": "31KJ416E5QULQE3S234CDZXT68DSVYL"
            },
            {
              "id": 74676291,
              "firstName": "Araceli",
              "secondName": "Miller",
              "lastName": "Jacobi",
              "city": "New Monserrathaven",
              "streetAddress": "75269 Aniyah Mall",
              "phone": "856.051.7976 x060",
              "email": "Nannie_Franecki70@hotmail.com",
              "currencyName": "Costa Rican Colon",
              "currencyCode": "ISK",
              "currencySymbol": "£",
              "account": "43676248",
              "accountName": "Investment Account",
              "bitcoinAddress": "3YFUUEJ4AC815S70V5SLLP6FSEHT53LAA"
            },
            {
              "id": 79130235,
              "firstName": "Susanna",
              "secondName": "Guido",
              "lastName": "Renner",
              "city": "Leuschketon",
              "streetAddress": "06376 Renner Plains",
              "phone": "(934) 869-4176",
              "email": "Jaylon.Kreiger95@yahoo.com",
              "currencyName": "Djibouti Franc",
              "currencyCode": "PYG",
              "currencySymbol": "₨",
              "account": "78272717",
              "accountName": "Personal Loan Account",
              "bitcoinAddress": "1TSM3D9WB0WGMP8KEYI417ZSP2Z681S7"
            }
          ]
      }
    };
  }
}

window.customElements.define('datagrid-element', DatagridElement);
