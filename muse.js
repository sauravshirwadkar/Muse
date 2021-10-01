$(document).ready(function () {
  $(
    "#mainUtnaBlock, #paintedDiyaBlock, #soapBlock, #ship, #nameVolunteer, #other, #transactionid"
  ).hide();

  $("#agarbatti").click(function () {
    $("#mainAgarbattiBlock").slideToggle();
    $("#agarbatti").toggleClass("active-link");

    $("#mainUtnaBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();
    $("#soapBlock").slideUp();

    $("#utna").removeClass("active-link");
    $("#diya").removeClass("active-link");
    $("#soap").removeClass("active-link");
  });

  $("#utna").click(function () {
    $("#mainUtnaBlock").slideToggle();
    $("#utna").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();
    $("#soapBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#diya").removeClass("active-link");
    $("#soap").removeClass("active-link");
  });

  $("#diya").click(function () {
    $("#paintedDiyaBlock").slideToggle();
    $("#diya").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#mainUtnaBlock").slideUp();
    $("#soapBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#utna").removeClass("active-link");
    $("#soap").removeClass("active-link");
  });

  $("#soap").click(function () {
    $("#soapBlock").slideToggle();
    $("#soap").toggleClass("active-link");

    $("#mainAgarbattiBlock").slideUp();
    $("#mainUtnaBlock").slideUp();
    $("#paintedDiyaBlock").slideUp();

    $("#agarbatti").removeClass("active-link");
    $("#utna").removeClass("active-link");
    $("#diya").removeClass("active-link");
  });

  $("#yes").click(function () {
    $("#ship").slideDown("slow");
    $(".shipForm").attr("required", true);
  });

  $("#no").click(function () {
    $("#ship").slideUp();
    $(".shipForm").attr("required", false);
  });

  $("#neft").click(function () {
    $("#transactionid").slideDown("slow");
    $(".neftReq").attr("required", true);
  });

  $("#cash").click(function () {
    $("#transactionid").slideUp();
    $(".neftReq").attr("required", false);
  });

  $(function () {
    $("#mode").change(function () {
      if ($(this).val() == 1) {
        $("#nameVolunteer").show();
        $("#other").hide();
      } else if ($(this).val() == 5) {
        $("#other").show();
        $("#nameVolunteer").hide();
      } else {
        $("#nameVolunteer").hide();
        $("#other").hide();
      }
    });
  });
});
