import DEFAULT_COUNTRY_TAXES from 'mui/utils/country/default-taxes';
/**
 * List of countries
 * Short comes from ISO 3166-1 alpha-2 standard
 *
 * Note that this list is also managed in:
 *   Masterlock (FB_ALLOWED_COUNTRIES in config/initializers/constants.rb)
 *   Evolve     (FB_ALLOWED_COUNTRIES in evolve/codes.py)
 * List should be updated in all places if it needs to be changed.
 */
export default [
  {
    name: {
      common: 'United States',
      short: 'US',
      phone: '1'
    },
    states: [
      {
        short: 'AL',
        name: 'Alabama'
      },
      {
        short: 'AK',
        name: 'Alaska'
      },
      {
        short: 'AZ',
        name: 'Arizona'
      },
      {
        short: 'AR',
        name: 'Arkansas'
      },
      {
        short: 'CA',
        name: 'California'
      },
      {
        short: 'CO',
        name: 'Colorado'
      },
      {
        short: 'CT',
        name: 'Connecticut'
      },
      {
        short: 'DC',
        name: 'District of Columbia'
      },
      {
        short: 'DE',
        name: 'Delaware'
      },
      {
        short: 'FL',
        name: 'Florida'
      },
      {
        short: 'GA',
        name: 'Georgia'
      },
      {
        short: 'HI',
        name: 'Hawaii'
      },
      {
        short: 'ID',
        name: 'Idaho'
      },
      {
        short: 'IL',
        name: 'Illinois'
      },
      {
        short: 'IN',
        name: 'Indiana'
      },
      {
        short: 'IA',
        name: 'Iowa'
      },
      {
        short: 'KS',
        name: 'Kansas'
      },
      {
        short: 'KY',
        name: 'Kentucky'
      },
      {
        short: 'LA',
        name: 'Louisiana'
      },
      {
        short: 'ME',
        name: 'Maine'
      },
      {
        short: 'MD',
        name: 'Maryland'
      },
      {
        short: 'MA',
        name: 'Massachusetts'
      },
      {
        short: 'MI',
        name: 'Michigan'
      },
      {
        short: 'MN',
        name: 'Minnesota'
      },
      {
        short: 'MS',
        name: 'Mississippi'
      },
      {
        short: 'MO',
        name: 'Missouri'
      },
      {
        short: 'MT',
        name: 'Montana'
      },
      {
        short: 'NE',
        name: 'Nebraska'
      },
      {
        short: 'NV',
        name: 'Nevada'
      },
      {
        short: 'NH',
        name: 'New Hampshire'
      },
      {
        short: 'NJ',
        name: 'New Jersey'
      },
      {
        short: 'NM',
        name: 'New Mexico'
      },
      {
        short: 'NY',
        name: 'New York'
      },
      {
        short: 'NC',
        name: 'North Carolina'
      },
      {
        short: 'ND',
        name: 'North Dakota'
      },
      {
        short: 'OH',
        name: 'Ohio'
      },
      {
        short: 'OK',
        name: 'Oklahoma'
      },
      {
        short: 'OR',
        name: 'Oregon'
      },
      {
        short: 'PA',
        name: 'Pennsylvania'
      },
      {
        short: 'RI',
        name: 'Rhode Island'
      },
      {
        short: 'SC',
        name: 'South Carolina'
      },
      {
        short: 'SD',
        name: 'South Dakota'
      },
      {
        short: 'TN',
        name: 'Tennessee'
      },
      {
        short: 'TX',
        name: 'Texas'
      },
      {
        short: 'UT',
        name: 'Utah'
      },
      {
        short: 'VT',
        name: 'Vermont'
      },
      {
        short: 'VA',
        name: 'Virginia'
      },
      {
        short: 'WA',
        name: 'Washington'
      },
      {
        short: 'WV',
        name: 'West Virginia'
      },
      {
        short: 'WI',
        name: 'Wisconsin'
      },
      {
        short: 'WY',
        name: 'Wyoming'
      }
    ],
    other_states: [
      {
        short: 'Armed Forces Africa',
        name: 'Armed Forces Africa'
      },
      {
        short: 'Armed Forces Americas',
        name: 'Armed Forces Americas'
      },
      {
        short: 'Armed Forces Canada',
        name: 'Armed Forces Canada'
      },
      {
        short: 'Armed Forces Europe',
        name: 'Armed Forces Europe'
      },
      {
        short: 'Armed Forces Middle East',
        name: 'Armed Forces Middle East'
      },
      {
        short: 'Armed Forces Pacific',
        name: 'Armed Forces Pacific'
      },
      {
        short: 'PR',
        name: 'Puerto Rico'
      },
      {
        short: 'VI',
        name: 'Virgin Islands'
      }
    ]
  },
  {
    name: {
      common: 'Canada',
      short: 'CA',
      phone: '1'
    },
    states: [
      {
        short: 'AB',
        name: 'Alberta'
      },
      {
        short: 'BC',
        name: 'British Columbia'
      },
      {
        short: 'MB',
        name: 'Manitoba'
      },
      {
        short: 'NB',
        name: 'New Brunswick'
      },
      {
        short: 'NL',
        name: 'Newfoundland & Labrador'
      },
      {
        short: 'NS',
        name: 'Nova Scotia'
      },
      {
        short: 'NU',
        name: 'Nunavut'
      },
      {
        short: 'NT',
        name: 'Northwest Territories'
      },
      {
        short: 'ON',
        name: 'Ontario'
      },
      {
        short: 'PE',
        name: 'Prince Edward Island'
      },
      {
        short: 'QC',
        name: 'Québec'
      },
      {
        short: 'SK',
        name: 'Saskatchewan'
      },
      {
        short: 'YT',
        name: 'Yukon'
      }
    ]
  },
  {
    name: {
      common: 'United Kingdom',
      short: 'GB',
      phone: '44'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Afghanistan',
      short: 'AF',
      phone: '93'
    }
  },
  {
    name: {
      common: 'Albania',
      short: 'AL',
      phone: '355'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Algeria',
      short: 'DZ',
      phone: '213'
    }
  },
  {
    name: {
      common: 'American Samoa',
      short: 'AS',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Andorra',
      short: 'AD',
      phone: '376'
    }
  },
  {
    name: {
      common: 'Anguilla',
      short: 'AI',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Angola',
      short: 'AO',
      phone: '244'
    }
  },
  {
    name: {
      common: 'Antarctica',
      short: 'AQ',
      phone: '672'
    }
  },
  {
    name: {
      common: 'Antigua and Barbuda',
      short: 'AG',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Argentina',
      short: 'AR',
      phone: '54'
    },
    taxName: DEFAULT_COUNTRY_TAXES.CUIT
  },
  {
    name: {
      common: 'Armenia',
      short: 'AM',
      phone: '374'
    }
  },
  {
    name: {
      common: 'Aruba',
      short: 'AW',
      phone: '297'
    }
  },
  {
    name: {
      common: 'Australia',
      short: 'AU',
      phone: '61'
    },
    taxName: DEFAULT_COUNTRY_TAXES.ABN
  },
  {
    name: {
      common: 'Austria',
      short: 'AT',
      phone: '43'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Azerbaijan',
      short: 'AZ',
      phone: '994'
    }
  },
  {
    name: {
      common: 'Bahamas',
      short: 'BS',
      phone: '1'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Bahrain',
      short: 'BH',
      phone: '973'
    }
  },
  {
    name: {
      common: 'Bangladesh',
      short: 'BD',
      phone: '880'
    }
  },
  {
    name: {
      common: 'Barbados',
      short: 'BB',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Belarus',
      short: 'BY',
      phone: '375'
    }
  },
  {
    name: {
      common: 'Belgium',
      short: 'BE',
      phone: '32'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Belize',
      short: 'BZ',
      phone: '501'
    }
  },
  {
    name: {
      common: 'Benin',
      short: 'BJ',
      phone: '229'
    }
  },
  {
    name: {
      common: 'Bermuda',
      short: 'BM',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Bhutan',
      short: 'BT',
      phone: '975'
    }
  },
  {
    name: {
      common: 'Bolivia',
      short: 'BO',
      phone: '591'
    }
  },
  {
    name: {
      common: 'Bosnia and Herzegovina',
      short: 'BA',
      phone: '387'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Botswana',
      short: 'BW',
      phone: '267'
    }
  },
  {
    name: {
      common: 'Bouvet Island',
      short: 'BV',
      phone: '47'
    }
  },
  {
    name: {
      common: 'Brazil',
      short: 'BR',
      phone: '55'
    }
  },
  {
    name: {
      common: 'British Indian Ocean Territory',
      short: 'IO',
      phone: '246'
    }
  },
  {
    name: {
      common: 'Brunei Darussalam',
      short: 'BN',
      phone: '673'
    }
  },
  {
    name: {
      common: 'Bulgaria',
      short: 'BG',
      phone: '359'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Burkina Faso',
      short: 'BF',
      phone: '226'
    }
  },
  {
    name: {
      common: 'Burundi',
      short: 'BI',
      phone: '257'
    }
  },
  {
    name: {
      common: 'Cambodia',
      short: 'KH',
      phone: '855'
    }
  },
  {
    name: {
      common: 'Cameroon',
      short: 'CM',
      phone: '237'
    }
  },
  {
    name: {
      common: 'Cape Verde',
      short: 'CV',
      phone: '238'
    }
  },
  {
    name: {
      common: 'Cayman Islands',
      short: 'KY',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Chad',
      short: 'TD',
      phone: '235'
    }
  },
  {
    name: {
      common: 'Chile',
      short: 'CL',
      phone: '56'
    }
  },
  {
    name: {
      common: 'China',
      short: 'CN',
      phone: '86'
    }
  },
  {
    name: {
      common: 'Christmas Island',
      short: 'CX',
      phone: '61'
    }
  },
  {
    name: {
      common: 'Cocos (Keeling Islands)',
      short: 'CC',
      phone: '61'
    }
  },
  {
    name: {
      common: 'Colombia',
      short: 'CO',
      phone: '57'
    }
  },
  {
    name: {
      common: 'Comoros',
      short: 'KM',
      phone: '269'
    }
  },
  {
    name: {
      common: 'Congo',
      short: 'CG',
      phone: '682'
    }
  },
  {
    name: {
      common: 'Cook Islands',
      short: 'CK',
      phone: '506'
    }
  },
  {
    name: {
      common: 'Costa Rica',
      short: 'CR',
      phone: '385'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: "Cote D'Ivoire (Ivory Coast)",
      short: 'CI',
      phone: '2254'
    }
  },
  {
    name: {
      common: 'Croatia (Hrvatska)',
      short: 'HR',
      phone: '385'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Cuba',
      short: 'CU',
      phone: '53'
    }
  },
  {
    name: {
      common: 'Curacao',
      short: 'CW',
      phone: '599'
    }
  },
  {
    name: {
      common: 'Cyprus',
      short: 'CY',
      phone: '357'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Czech Republic',
      short: 'CZ',
      phone: '420'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Democratic Republic of the Congo',
      short: 'CD'
    }
  },
  {
    name: {
      common: 'Denmark',
      short: 'DK',
      phone: '45'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Djibouti',
      short: 'DJ',
      phone: '253'
    }
  },
  {
    name: {
      common: 'Dominica',
      short: 'DM',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Dominican Republic',
      short: 'DO',
      phone: '1'
    }
  },
  {
    name: {
      common: 'East Timor',
      short: 'TL',
      phone: '670'
    }
  },
  {
    name: {
      common: 'Egypt',
      short: 'EG',
      phone: '20'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'El Salvador',
      short: 'SV',
      phone: '503'
    }
  },
  {
    name: {
      common: 'Ecuador',
      short: 'EC',
      phone: '593'
    }
  },
  {
    name: {
      common: 'Equatorial Guinea',
      short: 'GQ',
      phone: '240'
    }
  },
  {
    name: {
      common: 'Eritrea',
      short: 'ER',
      phone: '291'
    }
  },
  {
    name: {
      common: 'Estonia',
      short: 'EE',
      phone: '372'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Ethiopia',
      short: 'ET',
      phone: '251'
    }
  },
  {
    name: {
      common: 'Falkland Islands (Malvinas)',
      short: 'FK',
      phone: '500'
    }
  },
  {
    name: {
      common: 'Faroe Islands',
      short: 'FO',
      phone: '298'
    }
  },
  {
    name: {
      common: 'Federated States of Micronesia',
      short: 'FM',
      phone: '691'
    }
  },
  {
    name: {
      common: 'Fiji',
      short: 'FJ',
      phone: '679'
    }
  },
  {
    name: {
      common: 'Finland',
      short: 'FI',
      phone: '358'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'France',
      short: 'FR',
      phone: '33'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'French Guiana',
      short: 'GF',
      phone: '594'
    }
  },
  {
    name: {
      common: 'French Polynesia',
      short: 'PF',
      phone: '689'
    }
  },
  {
    name: {
      common: 'French Southern Territories',
      short: 'TF',
      phone: '262'
    }
  },
  {
    name: {
      common: 'Gabon',
      short: 'GA',
      phone: '241'
    }
  },
  {
    name: {
      common: 'Gambia',
      short: 'GM',
      phone: '220'
    }
  },
  {
    name: {
      common: 'Georgia',
      short: 'GE',
      phone: '995'
    }
  },
  {
    name: {
      common: 'Germany',
      short: 'DE',
      phone: '49'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Ghana',
      short: 'GH',
      phone: '233'
    }
  },
  {
    name: {
      common: 'Gibraltar',
      short: 'GI',
      phone: '350'
    }
  },
  {
    name: {
      common: 'Greece',
      short: 'GR',
      phone: '30'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Greenland',
      short: 'GL',
      phone: '299'
    }
  },
  {
    name: {
      common: 'Grenada',
      short: 'GD',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Guadeloupe',
      short: 'GP',
      phone: '590'
    }
  },
  {
    name: {
      common: 'Guam',
      short: 'GU',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Guatemala',
      short: 'GT',
      phone: '502'
    }
  },
  {
    name: {
      common: 'Guernsey',
      short: 'GG',
      phone: '44'
    }
  },
  {
    name: {
      common: 'Guinea',
      short: 'GN',
      phone: '224'
    }
  },
  {
    name: {
      common: 'Guinea-Bissau',
      short: 'GW',
      phone: '245'
    }
  },
  {
    name: {
      common: 'Guyana',
      short: 'GY',
      phone: '592'
    }
  },
  {
    name: {
      common: 'Haiti',
      short: 'HT',
      phone: '509'
    }
  },
  {
    name: {
      common: 'Heard and McDonald Islands',
      short: 'HM',
      phone: '672'
    }
  },
  {
    name: {
      common: 'Honduras',
      short: 'HN',
      phone: '504'
    }
  },
  {
    name: {
      common: 'Hong Kong',
      short: 'HK',
      phone: '852'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Hungary',
      short: 'HU',
      phone: '36'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Iceland',
      short: 'IS',
      phone: '354'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'India',
      short: 'IN',
      phone: '91'
    }
  },
  {
    name: {
      common: 'Indonesia',
      short: 'ID',
      phone: '62'
    }
  },
  {
    name: {
      common: 'Iraq',
      short: 'IQ',
      phone: '964'
    }
  },
  {
    name: {
      common: 'Ireland',
      short: 'IE',
      phone: '353'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Isle of Man',
      short: 'IM',
      phone: '44'
    }
  },
  {
    name: {
      common: 'Israel',
      short: 'IL',
      phone: '972'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Italy',
      short: 'IT',
      phone: '390'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Jamaica',
      short: 'JM',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Japan',
      short: 'JP',
      phone: '81'
    }
  },
  {
    name: {
      common: 'Jersey',
      short: 'JE',
      phone: '44'
    }
  },
  {
    name: {
      common: 'Jordan',
      short: 'JO',
      phone: '962'
    }
  },
  {
    name: {
      common: 'Kazakhstan',
      short: 'KZ',
      phone: '7'
    }
  },
  {
    name: {
      common: 'Kenya',
      short: 'KE',
      phone: '254'
    }
  },
  {
    name: {
      common: 'Kiribati',
      short: 'KI',
      phone: '686'
    }
  },
  {
    name: {
      common: 'Republic of Korea',
      short: 'KR',
      phone: '82'
    }
  },
  {
    name: {
      common: 'Kosovo',
      short: 'XK',
      phone: '383'
    }
  },
  {
    name: {
      common: 'Kuwait',
      short: 'KW',
      phone: '965'
    }
  },
  {
    name: {
      common: 'Kyrgyzstan',
      short: 'KG',
      phone: '996'
    }
  },
  {
    name: {
      common: 'Laos',
      short: 'LA',
      phone: '856'
    }
  },
  {
    name: {
      common: 'Latvia',
      short: 'LV',
      phone: '371'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Lesotho',
      short: 'LS',
      phone: '266'
    }
  },
  {
    name: {
      common: 'Liberia',
      short: 'LR',
      phone: '231'
    }
  },
  {
    name: {
      common: 'Liechtenstein',
      short: 'LI',
      phone: '423'
    }
  },
  {
    name: {
      common: 'Lithuania',
      short: 'LT',
      phone: '370'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Luxembourg',
      short: 'LU',
      phone: '352'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Macau',
      short: 'MO',
      phone: '853'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Macedonia',
      short: 'MK',
      phone: '389'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Madagascar',
      short: 'MG',
      phone: '261'
    }
  },
  {
    name: {
      common: 'Malawi',
      short: 'MW',
      phone: '265'
    }
  },
  {
    name: {
      common: 'Malaysia',
      short: 'MY',
      phone: '60'
    }
  },
  {
    name: {
      common: 'Maldives',
      short: 'MV',
      phone: '960'
    }
  },
  {
    name: {
      common: 'Mali',
      short: 'ML',
      phone: '223'
    }
  },
  {
    name: {
      common: 'Malta',
      short: 'MT',
      phone: '356'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Marshall Islands',
      short: 'MH',
      phone: '692'
    }
  },
  {
    name: {
      common: 'Martinique',
      short: 'MQ',
      phone: '596'
    }
  },
  {
    name: {
      common: 'Mauritania',
      short: 'MR',
      phone: '222'
    }
  },
  {
    name: {
      common: 'Mauritius',
      short: 'MU',
      phone: '230'
    }
  },
  {
    name: {
      common: 'Mayotte',
      short: 'YT',
      phone: '262'
    }
  },
  {
    name: {
      common: 'Mexico',
      short: 'MX',
      phone: '52'
    },
    taxName: DEFAULT_COUNTRY_TAXES.RFC
  },
  {
    name: {
      common: 'Moldova',
      short: 'MD',
      phone: '373'
    }
  },
  {
    name: {
      common: 'Monaco',
      short: 'MC',
      phone: '377'
    }
  },
  {
    name: {
      common: 'Mongolia',
      short: 'MN',
      phone: '976'
    }
  },
  {
    name: {
      common: 'Montenegro',
      short: 'ME',
      phone: '382'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Montserrat',
      short: 'MS',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Morocco',
      short: 'MA',
      phone: '212'
    }
  },
  {
    name: {
      common: 'Mozambique',
      short: 'MZ',
      phone: '258'
    }
  },
  {
    name: {
      common: 'Namibia',
      short: 'NA',
      phone: '264'
    }
  },
  {
    name: {
      common: 'Nauru',
      short: 'NR',
      phone: '674'
    }
  },
  {
    name: {
      common: 'Nepal',
      short: 'NP',
      phone: '977'
    }
  },
  {
    name: {
      common: 'Netherlands',
      short: 'NL',
      phone: '31'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'New Caledonia',
      short: 'NC',
      phone: '687'
    }
  },
  {
    name: {
      common: 'New Zealand',
      short: 'NZ',
      phone: '64'
    },
    taxName: DEFAULT_COUNTRY_TAXES.GST
  },
  {
    name: {
      common: 'Nicaragua',
      short: 'NI',
      phone: '505'
    }
  },
  {
    name: {
      common: 'Niger',
      short: 'NE',
      phone: '227'
    }
  },
  {
    name: {
      common: 'Nigeria',
      short: 'NG',
      phone: '234'
    }
  },
  {
    name: {
      common: 'Niue',
      short: 'NU',
      phone: '683'
    }
  },
  {
    name: {
      common: 'Norfolk Island',
      short: 'NF',
      phone: '672'
    }
  },
  {
    name: {
      common: 'Northern Mariana Islands',
      short: 'MP',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Norway',
      short: 'NO',
      phone: '47'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Oman',
      short: 'OM',
      phone: '968'
    }
  },
  {
    name: {
      common: 'Pakistan',
      short: 'PK',
      phone: '92'
    }
  },
  {
    name: {
      common: 'Palau',
      short: 'PW',
      phone: '680'
    }
  },
  {
    name: {
      common: 'Panama',
      short: 'PA',
      phone: '507'
    }
  },
  {
    name: {
      common: 'Papua New Guinea',
      short: 'PG',
      phone: '675'
    }
  },
  {
    name: {
      common: 'Paraguay',
      short: 'PY',
      phone: '595'
    }
  },
  {
    name: {
      common: 'Peru',
      short: 'PE',
      phone: '51'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Philippines',
      short: 'PH',
      phone: '63'
    }
  },
  {
    name: {
      common: 'Pitcairn',
      short: 'PN',
      phone: '64'
    }
  },
  {
    name: {
      common: 'Poland',
      short: 'PL',
      phone: '48'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Portugal',
      short: 'PT',
      phone: '351'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Puerto Rico',
      short: 'PR',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Qatar',
      short: 'QA',
      phone: '974'
    }
  },
  {
    name: {
      common: 'Rwanda',
      short: 'RW',
      phone: '250'
    }
  },
  {
    name: {
      common: 'Reunion',
      short: 'RE',
      phone: '262'
    }
  },
  {
    name: {
      common: 'Romania',
      short: 'RO',
      phone: '40'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Russian Federation',
      short: 'RU',
      phone: '7'
    }
  },
  {
    name: {
      common: 'St. Helena',
      short: 'SH',
      phone: '290'
    }
  },
  {
    name: {
      common: 'Saint Kitts and Nevis',
      short: 'KN',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Saint Lucia',
      short: 'LC',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Saint-Martin',
      short: 'MF',
      phone: '590'
    }
  },
  {
    name: {
      common: 'St. Pierre and Miquelon',
      short: 'PM',
      phone: '508'
    }
  },
  {
    name: {
      common: 'St Vincent and the Grenadines',
      short: 'VC',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Samoa',
      short: 'WS',
      phone: '685'
    }
  },
  {
    name: {
      common: 'San Marino',
      short: 'SM',
      phone: '378'
    }
  },
  {
    name: {
      common: 'Sao Tome and Principe',
      short: 'ST',
      phone: '239'
    }
  },
  {
    name: {
      common: 'Saudi Arabia',
      short: 'SA',
      phone: '966'
    }
  },
  {
    name: {
      common: 'Senegal',
      short: 'SN',
      phone: '221'
    }
  },
  {
    name: {
      common: 'Serbia',
      short: 'RS',
      phone: '381'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Seychelles',
      short: 'SC',
      phone: '248'
    }
  },
  {
    name: {
      common: 'Sierra Leone',
      short: 'SL',
      phone: '232'
    }
  },
  {
    name: {
      common: 'Singapore',
      short: 'SG',
      phone: '65'
    }
  },
  {
    name: {
      common: 'Sint Maarten',
      short: 'SX',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Slovak Republic',
      short: 'SK',
      phone: '421'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Slovenia',
      short: 'SI',
      phone: '386'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Solomon Islands',
      short: 'SB',
      phone: '677'
    }
  },
  {
    name: {
      common: 'South Africa',
      short: 'ZA',
      phone: '27'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Spain',
      short: 'ES',
      phone: '34'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Sri Lanka',
      short: 'LK',
      phone: '94'
    }
  },
  {
    name: {
      common: 'State of Palestine',
      short: 'PS',
      phone: '970'
    }
  },
  {
    name: {
      common: 'Suriname',
      short: 'SR',
      phone: '597'
    }
  },
  {
    name: {
      common: 'Svalbard',
      short: 'SJ',
      phone: '47'
    }
  },
  {
    name: {
      common: 'Swaziland',
      short: 'SZ',
      phone: '268'
    }
  },
  {
    name: {
      common: 'Sweden',
      short: 'SE',
      phone: '46'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Switzerland',
      short: 'CH',
      phone: '41'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Taiwan',
      short: 'TW',
      phone: '886'
    }
  },
  {
    name: {
      common: 'Tajikistan',
      short: 'TJ',
      phone: '992'
    }
  },
  {
    name: {
      common: 'Tanzania',
      short: 'TZ',
      phone: '255'
    }
  },
  {
    name: {
      common: 'Thailand',
      short: 'TH',
      phone: '66'
    }
  },
  {
    name: {
      common: 'Togo',
      short: 'TG',
      phone: '228'
    }
  },
  {
    name: {
      common: 'Tokelau',
      short: 'TK',
      phone: '690'
    }
  },
  {
    name: {
      common: 'Tonga',
      short: 'TO',
      phone: '676'
    }
  },
  {
    name: {
      common: 'Trinidad and Tobago',
      short: 'TT',
      phone: '1'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Tunisia',
      short: 'TN',
      phone: '216'
    }
  },
  {
    name: {
      common: 'Turkey',
      short: 'TR',
      phone: '90'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'Turkmenistan',
      short: 'TM',
      phone: '993'
    }
  },
  {
    name: {
      common: 'Turks and Caicos Islands',
      short: 'TC',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Tuvalu',
      short: 'TV',
      phone: '688'
    }
  },
  {
    name: {
      common: 'Uganda',
      short: 'UG',
      phone: '256'
    }
  },
  {
    name: {
      common: 'Ukraine',
      short: 'UA',
      phone: '380'
    }
  },
  {
    name: {
      common: 'United Arab Emirates',
      short: 'AE',
      phone: '971'
    },
    taxName: DEFAULT_COUNTRY_TAXES.VAT
  },
  {
    name: {
      common: 'US Minor Outlying Islands',
      short: 'UM',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Uruguay',
      short: 'UY',
      phone: '598'
    }
  },
  {
    name: {
      common: 'Uzbekistan',
      short: 'UZ',
      phone: '998'
    }
  },
  {
    name: {
      common: 'Vanuatu',
      short: 'VU',
      phone: '678'
    }
  },
  {
    name: {
      common: 'Vatican City State',
      short: 'VA',
      phone: '379'
    }
  },
  {
    name: {
      common: 'Venezuela',
      short: 'VE',
      phone: '58'
    }
  },
  {
    name: {
      common: 'Vietnam',
      short: 'VN',
      phone: '84'
    }
  },
  {
    name: {
      common: 'Virgin Islands (British)',
      short: 'VG',
      phone: '681'
    }
  },
  {
    name: {
      common: 'Virgin Islands (US)',
      short: 'VI',
      phone: '1'
    }
  },
  {
    name: {
      common: 'Wallis and Futuna Islands',
      short: 'WF',
      phone: '681'
    }
  },
  {
    name: {
      common: 'Western Sahara',
      short: 'EH',
      phone: '212'
    }
  },
  {
    name: {
      common: 'Zambia',
      short: 'ZM',
      phone: '260'
    }
  }
];
