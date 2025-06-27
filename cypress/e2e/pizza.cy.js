  describe("Pizza Uygulaması Akış Testleri", () => {

  describe("Ana Sayfa", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });

    it("ACIKTIM butonuna tıklanınca sipariş sayfasına gider", () => {
      cy.get("button.aciktim").click();
      cy.url().should("include", "/siparis");
    });
  });

  describe("Sipariş Sayfası", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/siparis");
    });

    it("Form alanları doldurulabilir ve minimum 4 malzeme seçilebilir", () => {
      cy.get("input[name='boyut'][value='M']").check({ force: true });
      cy.get("select[name='hamur']").select("İnce");

      ["Sucuk", "Biber", "Domates", "Mısır"].forEach((m) => {
        cy.get(`input[type='checkbox'][value='${m}']`).check({ force: true });
      });

      cy.get("textarea[name='özel']")
        .type("Bol malzeme, kenarı çıtır")
        .should("have.value", "Bol malzeme, kenarı çıtır");
    });

    it("Form başarıyla gönderildiğinde onay sayfasına yönlendirilir", () => {
      cy.get("input[name='boyut'][value='L']").check({ force: true });
      cy.get("select[name='hamur']").select("Normal");

      ["Soğan", "Jalepeno", "Sucuk", "Mozarella"].forEach((m) => {
        cy.get(`input[type='checkbox'][value='${m}']`).check({ force: true });
      });

      cy.get("textarea[name='özel']").type("Acı olmasın.");
      cy.get("button.submit-btn").should("not.be.disabled").click();

      cy.url().should("include", "/onay");
    });
  });

 describe("Sipariş Onayı Sayfası", () => {
  beforeEach(() => {
   
    cy.visit("http://localhost:5173/siparis");

    cy.get("input[name='boyut'][value='M']").check({ force: true });
    cy.get("select[name='hamur']").select("İnce");

    ["Pepperoni", "Domates", "Sucuk", "Biber"].forEach((m) => {
      cy.get(`input[type='checkbox'][value='${m}']`).check({ force: true });
    });

    cy.get("textarea[name='özel']").type("Bol bol sucuklu olsun.");
    cy.get("button.submit-btn").click(); 
  });

  it("Sipariş onay mesajı ve logo görünür", () => {
    
    cy.url().should("include", "/onay");
    cy.contains("Lezzet yolda").should("be.visible");
    cy.contains("SİPARİŞ ALINDI").should("be.visible");
    cy.get("img.sonlogo").should("exist");

    it("Ana Sayfaya Dön butonuna tıklanınca Ana sayfaya Döner", () => {
      cy.get("button.Ana Sayfaya Dön").click();
      cy.url().should("include", "/");
    });
  });
});

});
