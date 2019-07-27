Records = require('./requestModel');

exports.new = function (req, res) {

    if(req.body.startDate && req.body.endDate && req.body.minCount && req.body.maxCount){
        var start_date = req.body.startDate;
        var end_date = req.body.endDate;
        var min_count = req.body.minCount;
        var max_count = req.body.maxCount;
    }
    else{
        return res.status(400).json({
            code: 2,
            msg: 'Missing information in post request'
        });
    }

    if(isNaN(Date.parse(start_date)) || isNaN(Date.parse(end_date))){
        return res.status(400).json({
            code: 3,
            msg: 'Invalid date input'
        });
    }

    Records.aggregate([
        {$project: {
            _id: 0,
            key: 1,
            createdAt: 1,
            totalCount: {$sum: '$counts'},
            totalCountBtw: {
                $and: [
                    {$gte: [{$sum: '$counts'}, min_count]},
                    {$lte: [{$sum: '$counts'}, max_count]}
                ]}
        }},
        {$match: 
            {createdAt: 
                {$gte: new Date(start_date) ,$lte: new Date(end_date)},
                totalCountBtw: true
            }
        }
    ]
    ,function(err,records){
        if(err){ 
            return res.status(500).json({
                code: 1,
                msg: err,
            });
        }
        records.forEach(element => {
            delete element.totalCountBtw;
        });
        res.json({
            code: 0,
            msg: 'Success',
            records: records
        });
    })

};

