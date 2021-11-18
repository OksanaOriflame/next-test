var itemsjs = require('itemsjs')
var data = require('../../data/streets.json');
var streetItems = itemsjs(data, {
    sortings: {
        street_asc: {
            field: 'street',
            order: 'asc'
        },
        type_asc: {
            field: 'type',
            order: 'asc'
        }
    },
    searchableFields: ['street', 'type']
})


export default function handler(req, res) {
    const beginning = req.query.street
    const n = req.query.n
    var answer = streetItems.search({
        sort: 'street_asc',
        per_page: n,
        filter: function(item) {
            return item.street.slice(0, beginning.length).toLowerCase() === beginning.toLowerCase() ;
          }
    })
    res.status(200).json({ 
        streets: answer.data.items
    })
  }