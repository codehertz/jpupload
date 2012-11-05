jpupload
========

1. require
```html
<script type="text/javascript" src="/js/jquery/jquery.extend.jpupload.v1.1.js"></script>
```

2. bind
```js
    $("#file").change(doUpload);

    function doUpload() {
        eventStartUpload();

        $.jpIFrameFileUpload({
            "fileElementId" : "file",
            "url" : "<?=\Common\Module\Url\Image::upload()?>", //callbackurl
            "params" : {
                "return" : "<?=\Common\Module\Url\Image::callback('cov140')?>"
            },
            "callback" : function(response) {
                $("#file").change(doUpload);
            },
            "fail" : function(err) {}
        });
    }
```