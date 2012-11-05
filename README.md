jpupload
========

1. require
```html
<script type="text/javascript" src="/js/jquery/jquery.extend.jpupload.v1.1.js"></script>
```

2. bind
```js
    $("#file").change(doUpload);
    var picInfo = {};
    function doUpload() {
        eventStartUpload();

        $.jpIFrameFileUpload({
            "fileElementId" : "file",
            "url" : "<?=\Common\Module\Url\Image::upload()?>",
            "params" : {
                "return" : "<?=\Common\Module\Url\Image::callback('cov140')?>"
            },
            "callback" : function(response) {
                var img = $(".post-pic").find(".d2 img");

                if (response.status == "ok") {
                    img.attr("src", response.image.url);
                    $("#pic_host_id").val(response.image.host_id);
                    $("#pic_hash").val(response.image.hash);
                    $("#pic_height").val(response.image.height);
                    $("#pic_width").val(response.image.width);
                }

                img.load(eventEndUpload);
                $("#file").change(doUpload);
            },
            "fail" : function(err) {}
        });
    }
```