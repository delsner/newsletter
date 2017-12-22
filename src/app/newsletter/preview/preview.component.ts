import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() email = {
    meta: {
      heading: 'Free Newsletter November 2016'
    },
    general: {
      heading: 'Newsletter',
      subheading: 'November 2016',
      logo: 'https://cdn2.iconfinder.com/data/icons/miscellaneous-12/24/miscellaneous-62-128.png'
    },
    colors: {
      primary: '#12569E',
      secondary: '#ffffff',
      third: '#ffffff',
      fourth: '#6DBBEF',
      fifth: '#f7ffff',
      sixth: '#ADACB2',
      seventh: '#44525f',
      eighth: '#2f3942',
      ninth: '#153643'
    },
    introduction: {
      heading: 'News in November',
      text: 'These are the news in November 2016, stay tuned.'
    },
    sections: [
      {
        heading: 'First story',
        text: 'This is the text for the story in the first section, feel free to change it to whatever you want to say. You can also add new sections through the controls on the left.',
        img: 'https://cdn2.iconfinder.com/data/icons/miscellaneous-12/24/miscellaneous-62-128.png',
        button: 'Continue reading...',
        link: 'https://delsner.github.io/newsletter'
      }
    ],
    bottom: {
      text: 'Tired of this newsletter? Click unsubscribe below to stop receiving this newsletter.',
      unsubscribe: 'Unsubscribe',
      link: 'https://delsner.github.io/newsletter'
    },
    imprint: {
      company: 'Company Inc.',
      street: 'North Street 1',
      city: '12323 Newsletter-Town',
      website: 'http://delsner.github.io/newsletter',
      responsibilities: 'Chairmen: John News & Jake Letter'
    }
  };
  config: string;

  constructor() {
  }

  ngOnInit() {
  }

  getJson() {
    return JSON.stringify(this.email);
  }

  setJson() {
    const cfg = JSON.parse(this.config);
    Object.keys(this.email).forEach((key) => {
      this.email[key] = cfg[key];
    });
  }

  getHeadContent() {
    return `<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>${this.email.meta.heading}</title>
    </head>`;
  }

  getHtmlEmailContent() {
    return `<html xmlns="http://www.w3.org/1999/xhtml">
      ${this.getHeadContent()}
      ${this.getBodyContent()}
      </html>`;
  }

  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = window.atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: 'text/html;charset=utf-8'});
  }

  getDownloadHtmlLink() {
    const link = document.createElement('a');
    const base64encodedHtml = window.btoa(this.getHtmlEmailContent());
    const blob = this.dataURLtoBlob(`data:text/html;charset=utf-8,${base64encodedHtml}`);
    link.download = 'email.html';
    link.href = URL.createObjectURL(blob);
    link.click();
  }

  getSections() {
    return this.email.sections.map((section) => {
      const img = section.img !== '' ? `<img src="${section.img}" width="115" height="auto" border="0" alt="article" style="height: auto;"/>` : ``;
      const button = section.button !== '' ? `<td class="button" height="35" align="center" style="text-align: center; font-size: 14px; font-family: sans-serif; font-weight: bold; padding: 0 30px;">
            <a href="${section.link}" style="color: #ffffff; text-decoration: none; display: block !important; padding: 15px 15px 13px;">${section.button}</a>
        </td>` : ``;
      return `<tr>
                        <td class="innerpadding borderbottom" style="border-bottom-width: 1px; border-bottom-color: #f2eeed; border-bottom-style: solid; padding: 30px;">
                            <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="h3" style="color: ${this.email.colors.primary}; font-family: sans-serif; font-size: 20px; line-height: 24px; font-weight: bold; padding: 0 0 5px;">
                                        ${section.heading}
                                    </td>
                                </tr>
                            </table>
                            <table width="115" align="left" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td height="115" style="padding: 0 20px 20px 0;">` + img + `
                                    </td>
                                </tr>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
      <table width="380" align="left" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
    <![endif]-->
                            <table class="col380" align="left" border="0" cellpadding="0" cellspacing="0" width="380" style="width: 380px !important; max-width: 380px;">
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td class="bodycopy" style="color:${this.email.colors.ninth}; font-family: sans-serif; font-size: 16px; line-height: 22px;">
                                                    ${section.text}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 20px 0 0 0;">
                                                    <table class="buttonwrapper" align="right" bgcolor="${this.email.colors.sixth}" border="0" cellspacing="0" cellpadding="0" style="background-color: ${this.email.colors.sixth}">
                                                        <tr>` + button + `
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
          </td>
        </tr>
    </table>
    <![endif]-->
                        </td>
                    </tr>`;
    });
  }

  getBodyContent() {

    return `<body yahoo style="min-width: 100% !important; margin: 0; padding: 0;">
    <table width="100%" bgcolor="${this.email.colors.fifth}" border="0" cellpadding="0" cellspacing="0" style="background-color:${this.email.colors.fifth}">
        <tr>
            <td>
                <!--[if (gte mso 9)|(IE)]>
<table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td>
            <![endif]-->
                <table class="content" align="center" cellpadding="0" cellspacing="0" border="0" bgcolor="${this.email.colors.third}" style="width: 600px !important; max-width: 600px;" style="background-color:${this.email.colors.third}">
                    <tr>
                        <td class="header" bgcolor="${this.email.colors.fourth}" style="padding: 20px 30px;" style="background-color:${this.email.colors.fourth}">

                            <!--[if (gte mso 9)|(IE)]>
<table width="425" align="left" cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td>
        <![endif]-->
                            <table class="col275" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 275px !important; max-width: 275px;">
                                <tr>
                                    <td height="70">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" >
                                            <tr>
                                                <td class="subhead" style="font-size: 15px; color: ${this.email.colors.secondary}; font-family: sans-serif; letter-spacing: 10px; padding: 0 0 0 3px;">
                                                    ${this.email.general.subheading}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="h1" style="font-size: 33px; line-height: 38px; font-weight: bold; color: ${this.email.colors.primary}; font-family: sans-serif; padding: 5px 0 0;">
                                                    ${this.email.general.heading}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
        </td>
    </tr>
</table>
<![endif]-->
                            <table width="220" align="right" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td height="70" style="padding: 0 0px 20px 0;">
                                        <img src="${this.email.general.logo}" width="210" height="auto" border="0" alt="bild" style="height: auto;" />
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <tr>
                        <td class="innerpadding borderbottom" style="border-bottom-width: 1px; border-bottom-color: #f2eeed; border-bottom-style: solid; padding: 30px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="h2" style="color: ${this.email.colors.primary}; font-family: sans-serif; font-size: 24px; line-height: 28px; font-weight: bold; padding: 0 0 15px;">
                                        ${this.email.introduction.heading}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="bodycopy" style="color:${this.email.colors.ninth}; font-family: sans-serif; font-size: 16px; line-height: 22px;">
                                        ${this.email.introduction.text}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    ${this.getSections().join('')}

                    <tr>
                        <td class="innerpadding borderbottom bodycopy" style="color:${this.email.colors.ninth};font-family: sans-serif; border-bottom-width: 1px; border-bottom-color: #f2eeed; border-bottom-style: solid; font-size: 16px; line-height: 22px; padding: 30px;">
                            ${this.email.bottom.text}
                        </td>
                    </tr>

                    <tr>
                        <td class="footer" bgcolor="${this.email.colors.seventh}" style="padding: 20px 30px 15px;background-color:${this.email.colors.seventh}">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" class="footercopy" style="font-family: sans-serif; font-size: 14px; color: #ffffff;">
                                        <a href="${this.email.bottom.link}" class="unsubscribe" bgcolor="${this.email.colors.eighth}" style="color: #ffffff; text-decoration: none !important; display: block; margin-top: 20px; border-radius: 5px; font-weight: bold; width: 70px; background-color: ${this.email.colors.eighth}; padding: 10px 50px;">
                                            <font color="#ffffff">${this.email.bottom.unsubscribe}</font>
                                            <span class="hide" style="display: none !important;">from this newsletter instantly</span>
                                        </a>
                                        <p><b>${this.email.imprint.company}</b></p>
                                        <p>${this.email.imprint.street}</p>
                                        <p>${this.email.imprint.city}</p>
                                        <p><a href="${this.email.imprint.website}" style="color: #ffffff; text-decoration: underline;">${this.email.imprint.website}</a></p>
                                        <p>${this.email.imprint.responsibilities}</p>

                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
    </tr>
</table>
<![endif]-->
            </td>
        </tr>
    </table>
</body>`;
  }

}
