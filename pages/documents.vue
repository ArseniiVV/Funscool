<template>
  <div>
    <HeaderComponent />
    <section class="documents-section">
      <div class="container">
        <!-- Заголовок блока -->
        <h2 class="documents-title">Сведения о школе</h2>

        <!-- Обёртка для всего аккордеона -->
        <div class="my-accordion">
          <!-- Генерируем пункты аккордеона из массива данных -->
          <div v-for="(item, index) in accordionItems" :key="index" class="my-accordion__item">
            <!-- Заголовок пункта -->
            <div class="my-accordion__header">
              <button class="my-accordion__button" type="button" :aria-expanded="opened[index]"
                @click="toggleAccordion(index)">
                <span class="my-accordion__button-text">
                  {{ item.title }}
                </span>
                <!-- Иконка «плюс/минус» (или любая другая), меняется за счёт rotate -->
                <span class="my-accordion__icon" :class="{ 'my-accordion__icon--open': opened[index] }">
                  <!-- Можно использовать любой SVG- или икон-шрифт.
                     Ниже пример условного «+», который поворотом будет превращаться в «×» -->
                  <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
            </div>

            <!-- Контент пункта (раскрывается при opened[index] === true) -->
            <div class="my-accordion__content" v-show="opened[index]">
              <!-- Вставляем HTML-содержимое. Можно и просто текст, но здесь часто нужны ссылки. -->
              <!-- Если не хотите рендерить HTML, можно использовать обычный {{ }}. -->
              <div class="my-accordion__content-inner" v-html="item.content"></div>
            </div>
          </div>
        </div> <!-- .my-accordion -->
      </div> <!-- .container -->
    </section>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

// const accordionItems = [
//   {
//     title: 'Основные сведения',
//     content: `
//       <a
//         href="https://drive.google.com/file/d/12tnRgsb6FdMGgUJrhS2szC_oPmDRQvTm/view?usp=drive_link"
//         target="_blank"
//       >
//         Основные сведения
//       </a>
//     `
//   },
//   {
//     title: 'Структура и органы управления образовательной организацией',
//     content: `
//       <a
//         href="https://drive.google.com/file/d/1CfZFnWo9i2zfm1wXs_N-NkRYL6SazwLF/view?usp=drive_link"
//         target="_blank"
//       >
//         Структура и органы управления
//       </a>
//     `
//   },
//   {
//     title: 'Документы',
//     content: `
//       <strong>Правоустанавливающие документы:</strong><br />
//       <a
//         href="https://drive.google.com/file/d/1-AEsJ-GL3w8Qo8lTUhOMX4KsE3kT1dw1/view?usp=drive_link"
//         target="_blank"
//       >
//         Устав
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1H0TKwkHZ_IFKQVQoQ5PTfSbaZrR5ZOIt/view?usp=drive_link"
//         target="_blank"
//       >
//         Лицензия
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1cWCm0VuiBshR0afCH6CGjgGjAB0d-2p7/view?usp=drive_link"
//         target="_blank"
//       >
//         Свидетельство о государственной регистрации
//       </a>

//       <br /><br />

//       <strong>Локальные акты:</strong><br />
//       <a
//         href="https://drive.google.com/file/d/1HTonTlU2a3tK9EnHJjor7BuJPgOKuzHk/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о режиме занятий воспитанников
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1G8G3r001JFvsRBNTPLnaP7VfEYuh3OE7/view?usp=drive_link"
//         target="_blank"
//       >
//         Правила внутреннего распорядка обучающихся
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1IllMT6dVVk_XoTGGRaTGQyuP-bkhMl1b/view?usp=drive_link"
//         target="_blank"
//       >
//         Правила внутреннего трудового распорядка
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1ySc3R4VKgbSz0lMR5-olOJFzVTGv5fFF/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение об официальном сайте
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1SdY9m6zmApTLY7u1gY2m6WrN2aUGbeSp/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о защите, хранении, обработке и передаче персональных данных
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1hlPsbVxjmb5iUrko9m7XIuW5V-gR8wiI/view?usp=drive_link"
//         target="_blank"
//       >
//         Кодекс профессиональной этики
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1og274iZXb_JAkcHIc2DkB1-wnyGn4N6_/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о Педагогическом совете
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1fhJBg4gvX3m9LIpmcC9yvOass7fbB9cr/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о Родительском комитете
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1PLZzzqwjU-wM9emKJHCOVVkO0uu2wm-v/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о Родительском собрании
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1K9aLjotW2rKcUZjFMWCv0NJyWr1HG5Af/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о приеме, переводе, отчислении воспитанников
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1A4PFZtXFVHa4f3zDf9vh4_MXyxeiu5c6/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о порядке оформления возникновения, приостановления и прекращения отношений
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1qFtM3ivHVX33u2MeOP08mSP01eBXuXKu/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о Комиссии по урегулированию споров между участниками образовательных отношений
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1128S1iXu4dVs5LfY0gja9P-PvrhbXpol/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о внутренней системе оценки качества образования
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1vj8KSd3MztjEDMaCBJ2cuipLX8_8EWAJ/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о внутреннем контроле
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1WQXkyifxI-R5Xs9022sG5O28qucQTYrq/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о порядке самообследования
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1vj8KSd3MztjEDMaCBJ2cuipLX8_8EWAJ/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение об осуществлении текущего контроля освоения ООП ДО
//       </a>

//       <br /><br />

//       <strong>Документы, регламентирующие порядок оказания платных образовательных услуг:</strong><br />
//       <a
//         href="https://drive.google.com/file/d/1ajiLXggtmEADOolKMZIvphmOg9-vnEdS/view?usp=drive_link"
//         target="_blank"
//       >
//         Форма договора об оказании услуг дошкольного образования
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1e3NK-m2m5pZkiC1UcHnKpgYiFqbMBYxT/view?usp=drive_link"
//         target="_blank"
//       >
//         Заявление о приеме
//       </a>
//     `
//   },
//   {
//     title: 'Образование',
//     content: `
//       <a
//         href="https://drive.google.com/file/d/1eXE80-7EcPo_7oMiEttZDc6Dft0HrwJq/view?usp=drive_link"
//         target="_blank"
//       >
//         Общие сведения
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1-aP4FlAFxbdBgDK2BVdwFIldKeQCkLvg/view?usp=drive_link"
//         target="_blank"
//       >
//         Программа дошкольного образования с 1,5 до 3 лет (ГКП)
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1BOYXXANgJ-FEAknPQ-utQqrI7y8fTLIK/view?usp=drive_link"
//         target="_blank"
//       >
//         Программа дошкольного образования с 4 до 6 лет (ГКП)
//       </a>
//     `
//   },
//   {
//     title: 'Образовательные стандарты',
//     content: `
//       <a
//         href="https://drive.google.com/file/d/1nnoq8DQRNjHvM0HD6C9j9LqNSN8_yAwN/view?usp=drive_link"
//         target="_blank"
//       >
//         Федеральный государственный образовательный стандарт дошкольного образования
//       </a>
//     `
//   },
//   {
//     title: 'Руководство. Педагогический состав',
//     content: `
//       <a
//         href="https://drive.google.com/file/d/1t2t-hJQXq8gaW9sX8YroXBx92HWsvUg1/view?usp=drive_link"
//         target="_blank"
//       >
//         Руководство. Педагогический состав
//       </a>
//     `
//   },
//   {
//     title: 'Материально-техническое обеспечение и оснащенность',
//     content: `
//       <a
//         href="https://drive.google.com/file/d/1SMSiLcKPy2mpznDBt76dNjAKLu1J4nwt/view?usp=drive_link"
//         target="_blank"
//       >
//         Материально-техническое обеспечение и оснащенность
//       </a>
//     `
//   },
//   {
//     title: 'Платные образовательные услуги',
//     content: `
//       <a
//         href="https://drive.google.com/file/d/10o-HwP5BkdnnH107pBbxXs34Fr0yHG-D/view?usp=drive_link"
//         target="_blank"
//       >
//         Положение о порядке оказания платных образовательных услуг
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1ajiLXggtmEADOolKMZIvphmOg9-vnEdS/view"
//         target="_blank"
//       >
//         Форма договора об оказании услуг дошкольного образования
//       </a><br />
//       <a
//         href="https://drive.google.com/file/d/1e3NK-m2m5pZkiC1UcHnKpgYiFqbMBYxT/view"
//         target="_blank"
//       >
//         Заявление о приеме
//       </a>
//     `
//   },
//   {
//     title: 'Вакантные места для приема (перевода)',
//     content: `
//       <a
//         href="https://drive.google.com/file/d/14zYlw5B94oM_LjQATDxzepXlMNPbBbm2/view?usp=drive_link"
//         target="_blank"
//       >
//         Вакантные места для приема (перевода)
//       </a>
//     `
//   }
// ];

const accordionItems = [
  {
    title: 'Основные сведения',
    content: `
      <a
        href="https://drive.google.com/file/d/1quN7ak-d4ayN4MiFObK8up06rtS9zb_5/view?usp=sharing"
        target="_blank"
      >
        Сведения об образовательных центрах
      </a>
    `,
  },
  {
    title: 'Структура и органы управления образовательной организацией',
    content: `
      <a
        href="https://drive.google.com/file/d/1eiHcdKjer4mEJeV23BaZIRN9HHTer_dC/view?usp=sharing"
        target="_blank"
      >
        Структура управления
      </a>
    `,
  },
  {
    title: 'Документы',
    content: `
      <strong>Нормативные документы</strong><br />
      <a
        href="https://drive.google.com/file/d/1KhFQbhBMXL_2gkktSXqhEHIfrHDn5cPQ/view?usp=sharing"
        target="_blank"
      >
        Устав
      </a><br />
      <a
        href="https://drive.google.com/file/d/1cfW9uhW6WooSwFQHBkoXfwAIvNq8r4Fk/view?usp=share_link"
        target="_blank"
      >
        Лицензия
      </a><br />
      <a
        href="https://drive.google.com/file/d/1f5N5VOelNpbZxTSwTGVZRfh0eGB8cEXY/view?usp=share_link"
        target="_blank"
      >
        Уведомление о постановке на учет
      </a><br />
      <a
        href="https://drive.google.com/file/d/1LfDYqGZr6tgWO9dLy--OKuqpuyMxTxM9/view?usp=sharing"
        target="_blank"
      >
        Свидетельство об аккредитации
      </a>
      <br />
      <em>Локальные акты</em><br />
      <a
        href="https://drive.google.com/file/d/1dAXXV8zbojU_lyxwWz2jnIqLejpEr2Pz/view?usp=sharing"
        target="_blank"
      >
        Положение о ВСОКО
      </a><br />
      <a
        href="https://drive.google.com/file/d/13MCqxMgrpBJEHzqQhzlWAhHBtVHz5dQT/view?usp=sharing"
        target="_blank"
      >
        Положение об официальном сайте
      </a><br />
      <a
        href="https://drive.google.com/file/d/1Wf9X2JA2Ko0BYgM-STG_fh43Ow7NELWG/view?usp=sharing"
        target="_blank"
      >
        Положение о защите, хранении, обработке и передаче персональных данных
      </a><br />
      <a
        href="https://docs.google.com/document/d/1QR_YkyS6sgFAhQFV-onah8ufoAt1iDan/edit?usp=sharing&amp;ouid=116656364710437484176&amp;rtpof=true&amp;sd=true"
        target="_blank"
      >
        Особенности оценки предметных результатов по отдельным учебным предметам – НОО
      </a><br />
      <a
        href="https://docs.google.com/document/d/1VrGtTLtKRGsMmtYIUY_2CJ37G_nWkLSj/edit?usp=sharing&amp;ouid=116656364710437484176&amp;rtpof=true&amp;sd=true"
        target="_blank"
      >
        Итоговые планируемые результаты с указанием этапов их формирования и способов оценки – ООО
      </a><br />
      <a
        href="https://docs.google.com/document/d/1CIsFn1C-o3rD9_FyXPpes1aOlsENEjZd/edit?usp=sharing&amp;ouid=116656364710437484176&amp;rtpof=true&amp;sd=true"
        target="_blank"
      >
        Особенности оценки результатов – СОО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1tQnLBFu0hr7L5ipNlrG3Gaph3tcxLOiE/view?usp=sharing"
        target="_blank"
      >
        Положение о Педагогическом совете
      </a><br />
      <a
        href="https://drive.google.com/file/d/1cHoXLocC6jNhpWcuGpY5YksC3jXJONII/view?usp=sharing"
        target="_blank"
      >
        общеобразовательной автономной некоммерческой организации «Фанскул»
      </a><br />
      <a
        href="https://drive.google.com/file/d/1JfT_u-Igjix0Q3_DVEozUqnOV4URgSLx/view?usp=sharing"
        target="_blank"
      >
        Положение о библиотеке «Фанскул»
      </a><br />
      <a
        href="https://drive.google.com/file/d/1yfJPOFuB9CTdXGlMI4aAbVfigQTReiW0/view?usp=sharing"
        target="_blank"
      >
        Положение об электронной информационно-образовательной среде
      </a><br />
      <a
        href="https://drive.google.com/file/d/1krbzKOETOIANWKb5lsyZRxyiMQh4PodL/view?usp=sharing"
        target="_blank"
      >
        Отчет о самообследовании 2023
      </a><br />
      <a
        href="https://drive.google.com/file/d/1Loaz9oU78l6UlbJ5m-9z236o_hLC6mIM/view?usp=sharing"
        target="_blank"
      >
        План функционирования внутренней системы оценки качества образования (ВСОКО) на 2024/2025 учебный год
      </a><br />
      <a
        href="https://docs.google.com/document/d/1egahKVH12QDCrKnuh1TA1DhIkZ12Qm0S/edit?usp=sharing&amp;ouid=116656364710437484176&amp;rtpof=true&amp;sd=true"
        target="_blank"
      >
        Положение о режиме занятий
      </a><br />
      <a
        href="https://docs.google.com/document/d/1Tno9wqCwHtKgBcbB9ZVST3I_-M0i7qOl/edit?usp=sharing&amp;ouid=116656364710437484176&amp;rtpof=true&amp;sd=true"
        target="_blank"
      >
        Положение о формах, периодичности, порядке текущего контроля успеваемости и промежуточной аттестации
      </a><br />
      <a
        href="https://drive.google.com/file/d/1EkZg1YuPPMRC-sjLnnlmcbriK0VMZcKa/view?usp=sharing"
        target="_blank"
      >
        Положение о профильном обучении
      </a><br /><br /><br /><br /><br />
      <strong>Структурное подразделение ОАНО «ФАНСКУЛ» Кирова 27/1</strong><br /><br />
      <a
        href="https://drive.google.com/file/d/1qzP2jcj4kj7E0Jv_1lcR1Cw2OyQSVqV8/view?usp=share_link"
        target="_blank"
      >
        Правила приема обучающихся
      </a><br />
      <a
        href="https://drive.google.com/file/d/1Tbwiz6EoQw08WEppDHoUT-_kZ8MmLx0E/view?usp=share_link"
        target="_blank"
      >
        Правила внутреннего трудового распорядка
      </a><br />
      <a
        href="https://drive.google.com/file/d/1D1Iqc_XNJKraMuJnjatJIlPKc8jFcGqN/view?usp=share_link"
        target="_blank"
      >
        Правила внутреннего распорядка обучающихся
      </a><br />
      <a
        href="https://drive.google.com/file/d/1S78V65pffNX3WGXgflhkXCRmPnRBwRFf/view?usp=share_link"
        target="_blank"
      >
        Порядок оформления возникновения, приостановления и прекращения отношений
      </a><br />
      <a
        href="https://drive.google.com/file/d/1cK5kaE69flN_RbkvYm_UZSyIiKig6Dau/view?usp=share_link"
        target="_blank"
      >
        Положение об обработке персональных данных
      </a><br />
      <a
        href="https://drive.google.com/file/d/1wiArYwsA5eLBW4Hfb2dwPfyKXu7n1DzO/view?usp=share_link"
        target="_blank"
      >
        Положение об индивидуальном учебном плане
      </a><br />
      <a
        href="https://drive.google.com/file/d/1nDiFRTLhpU6i_QN6bUPVyN20wILCvoGj/view?usp=share_link"
        target="_blank"
      >
        Положение о языке (языках) обучения
      </a><br />
      <a
        href="https://drive.google.com/file/d/1hW-JmPHYOgmlUJVoYfSGY_1UY9afNvtI/view?usp=share_link"
        target="_blank"
      >
        Положение о формах обучения
      </a><br />
      <a
        href="https://drive.google.com/file/d/1orFyKBSyqbPCKROs-aHrJBh4Uz3Rag6G/view?usp=share_link"
        target="_blank"
      >
        Положение о психологической службе
      </a><br />
      <a
        href="https://drive.google.com/file/d/168VJVBt65HduuOTSibpqJw27WBUq72KW/view?usp=share_link"
        target="_blank"
      >
        Положение о переводе и отчислении
      </a><br />
      <a
        href="https://drive.google.com/file/d/1AOnXpOad0ORY6izeFjt3XOdTdmSpVl3J/view?usp=sharing"
        target="_blank"
      >
        Положение о структурном подразделении ОАНО «Фанскул», Кирова, 27/1
      </a><br /><br />
      <strong>Филиал ОАНО «ФАНСКУЛ» в г. Москва</strong><br /><br />
      <a
        href="https://drive.google.com/file/d/1PLkl1l8y2Ro4GOavriC0D1ZE1PqCc_zc/view?usp=sharing"
        target="_blank"
      >
        Положение о филиале
      </a><br />
      <a >Положение о приеме обучающихся</a><br />
      <a >Правила внутреннего распорядка обучающихся</a><br />
      <a >Положения о формах обучения</a><br />
      <a >Положение о дополнительном образовании</a><br />
      <a >Правила приема по программам дополнительного образования</a><br />
      <a >Положение о бракеражной комиссии</a><br />
      <a >Положение о порядке и основаниях перевода и отчисления обучающихся</a><br />
      <a >Положение о службе психолого-педагогического сопровождения</a><br />
      <a >Положение о языках обучения</a><br />
      <a >Правила внутреннего трудового распорядка</a><br /><br /><br />
      <strong>Структурное подразделение ОАНО «ФАНСКУЛ» «Образовательный центр FunsCool»</strong><br /><br />
      <a
        href="https://drive.google.com/file/d/1Fq2EG808OqPn5FNTBimOrHemmwSTAvmY/view?usp=share_link"
        target="_blank"
      >
        Положение о структурном подразделении
      </a><br />
      <a
        href="https://drive.google.com/file/d/1LEPChMrBIUzcGRHaBW-URf7UcB-M_hdA/view?usp=share_link"
        target="_blank"
      >
        Правила внутреннего распорядка обучающихся
      </a><br />
      <a
        href="https://drive.google.com/file/d/1OePtq__72Pc0bnPZ3PNo9q4qFP78RhAm/view?usp=sharing"
        target="_blank"
      >
        Правила внутреннего трудового распорядка
      </a><br />
      <a
        href="https://drive.google.com/file/d/1jsnHCgYdabl9Vcfp6Fk0yeRqUlrZWAkc/view?usp=share_link"
        target="_blank"
      >
        Правила приема обучающихся
      </a><br />
      <a
        href="https://drive.google.com/file/d/1W7Y343nAN_Dd8c5wilk0gZ55_DTfYXET/view?usp=share_link"
        target="_blank"
      >
        Положение о режиме занятий
      </a><br />
      <a
        href="https://drive.google.com/file/d/1af_cpAZut2BGh-KjNVwaBE34PwrelAyQ/view?usp=share_link"
        target="_blank"
      >
        Положение об административном контроле
      </a><br />
      <a
        href="https://drive.google.com/file/d/1Mizp7mS0Xzjzhlcn_DJr4ErAPrMeyENT/view?usp=share_link"
        target="_blank"
      >
        Положение о текущем контроле и промежуточной аттестации
      </a><br />
      <a
        href="https://drive.google.com/file/d/1kqUSKldz3gmPW8QrEBg3gMSNNhEaFUKn/view?usp=share_link"
        target="_blank"
      >
        Положение о порядке перевода, отчисления
      </a><br />
      <a
        href="https://drive.google.com/file/d/1q2HOw9aVLegrCrXhI4560TSUGd8febvq/view?usp=share_link"
        target="_blank"
      >
        Положение о порядке оформления отношений
      </a><br />
      <a
        href="https://drive.google.com/file/d/17tMh5O7j1JybdShuKEpygHspEgpMznk_/view?usp=share_link"
        target="_blank"
      >
        Положение о предотвращении и урегулировании конфликта интересов
      </a><br />
      <a
        href="https://drive.google.com/file/d/1k1ymrrUjmIKn-tELNWf2f8fLsuSRkJ2d/view?usp=share_link"
        target="_blank"
      >
        Положение об организации образовательной деятельности по ДОП
      </a><br />
      <a
        href="https://drive.google.com/file/d/1igmbdQyRCPcVcECiqUym79FtzlnkWQps/view?usp=share_link"
        target="_blank"
      >
        Положение об антикоррупционной политике
      </a><br />
      <a
        href="https://drive.google.com/file/d/1sB4vqa2BZpq4Fsnwd-bc9wydC2hSDxeR/view?usp=share_link"
        target="_blank"
      >
        Положение о языке образования
      </a><br />
      <a
        href="https://drive.google.com/file/d/1bA8pPE7Ey7-P5JTBq8yyIugb0vYV7zbl/view?usp=share_link"
        target="_blank"
      >
        Положение о бракеражной комиссии
      </a><br />
      <a
        href="https://drive.google.com/file/d/1SWBxky3ob29Ri48WgLIaCHpGp1CJtTQ8/view?usp=share_link"
        target="_blank"
      >
        Положение о заполнении, ведении журнала педагога допобразования
      </a><br /><br /><br />
      <strong>Структурные подразделения ОАНО «Фанскул» – Центры развития ребёнка</strong><br /><br />
      <a
        href="https://drive.google.com/file/d/1_yEvbvoUPDya86PChJtfSuOpW_IPV7Tm/view?usp=sharing"
        target="_blank"
      >
        Положение о режиме занятий
      </a><br />
      <a
        href="https://drive.google.com/file/d/1KDRWr9RFuxrDnJLFbW0XkSlu4OurliNH/view?usp=sharing"
        target="_blank"
      >
        Правила внутреннего распорядка воспитанников
      </a><br />
      <a
        href="https://drive.google.com/file/d/1Jc4weGonYwoY5-fthw8hamz2B1Me2MVL/view?usp=sharing"
        target="_blank"
      >
        Правила внутреннего трудового распорядка
      </a><br />
      <a
        href="https://drive.google.com/file/d/1eGZ5e2APsWJTWnl5KBRTCpfxWOiHwwXb/view?usp=sharing"
        target="_blank"
      >
        Положение о защите, хранении, обработке и передаче персональных данных
      </a><br />
      <a
        href="https://drive.google.com/file/d/1nEVc9fzynbtqEHAT8Ly721uyGFnpDeEn/view?usp=sharing"
        target="_blank"
      >
        Кодекс профессиональной этики
      </a><br />
      <a
        href="https://drive.google.com/file/d/11uhZsXVPTy8AkHf5j3Y9BQlROqlSOVVT/view?usp=sharing"
        target="_blank"
      >
        Положение о Педагогическом совете
      </a><br />
      <a
        href="https://drive.google.com/file/d/1Woatum9z-3oGEeHe9g5Vut0siZ69xNX4/view?usp=sharing"
        target="_blank"
      >
        Положение о Родительском комитете
      </a><br />
      <a
        href="https://drive.google.com/file/d/1Fx1zClHxcxqlikmT8TKS7GDybqKRKT5s/view?usp=sharing"
        target="_blank"
      >
        Положение о Родительском собрании
      </a><br />
      <a
        href="https://drive.google.com/file/d/1eABTMLXoReBZ_TagTtudcDab5xnb8SlI/view?usp=sharing"
        target="_blank"
      >
        Положение о приеме, переводе, отчислении воспитанников
      </a><br />
      <a
        href="https://drive.google.com/file/d/1wyvYjML2VyfSoxfVM1cQ0FwjaYK6iegw/view?usp=sharing"
        target="_blank"
      >
        Положение о порядке оформления возникновения, приостановления и прекращения отношений
      </a><br />
      <a
        href="https://drive.google.com/file/d/1gPMjmVNFlmsK8HEc3VI2GkNA3s9auIM1/view?usp=sharing"
        target="_blank"
      >
        Положение о Комиссии по урегулированию споров
      </a><br />
      <a
        href="https://drive.google.com/file/d/18jIzB7YjFCRVXPgJzWDIT3bzFUmjRgXi/view?usp=sharing"
        target="_blank"
      >
        Положение о внутреннем контроле
      </a><br />
      <a
        href="https://drive.google.com/file/d/1Wg5AUusPl26cF0tpQAbwXz9wX5UCHaQa/view?usp=sharing"
        target="_blank"
      >
        Положение о порядке самообследования
      </a><br />
      <a
        href="https://drive.google.com/file/d/1HGIQ2VGmEIm3Nw7Ib1FO_AN0mOj_qbCQ/view?usp=sharing"
        target="_blank"
      >
        Положение о ВСОКО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1YoRD4Gi_mU6bgXFJqPdfoNyo5PB8oALa/view?usp=sharing"
        target="_blank"
      >
        Положение о текущем контроле успеваемости
      </a>
    `,
  },
  {
    title: 'Образование',
    content: `
      <strong>Структурные подразделения ОАНО «Фанскул» – Центры раннего развития</strong><br /><br />
      <a
        href="https://drive.google.com/file/d/1oGS7-PYo6uJ2XZS8FNV2OmGqJnzgjvch/view?usp=sharing"
        target="_blank"
      >
        Образовательная программа дошкольного образования
      </a><br />
      <a
        href="https://drive.google.com/file/d/1qWeIJaXI4tREirSFOxkcxoChY3xhDfFV/view?usp=sharing"
        target="_blank"
      >
        Приложение к ООП ДО: Педагогическая диагностика достижения планируемых результатов детьми дошкольного возраста (1,5 - 7 лет)
      </a><br /><br />
      <a
        href="https://drive.google.com/file/d/1PG3AvrMcm8XexbTP8yIG15DV4U78aTCB/view?usp=sharing"
        target="_blank"
      >
        Программа развития Центров развития ребенка (2024–2027)
      </a><br /><br />
      <a
        href="https://drive.google.com/file/d/1NajPbRz76M8DTz1QfkdLryjWRQ8aBR2g/view?usp=sharing"
        target="_blank"
      >
        Учебный план на 2024–2025 учебный год (Центры развития ребенка)
      </a><br /><br />
      <a
        href="https://drive.google.com/file/d/1U2qkmmlqM945nI26ueb5lUjpeWg52957/view?usp=sharing"
        target="_blank"
      >
        Календарный учебный график 2024–2025 (Центры развития ребенка)
      </a><br /><br />
      <a
        href="https://drive.google.com/file/d/1hUfyg3Ld_UdOy4OaKj7OvIpq3SlKP4H7/view?usp=sharing"
        target="_blank"
      >
        Расписание организованной образовательной деятельности (2024–2025, ЦРР)
      </a><br /><br />      
    `,
  },
  {
    title: 'Образовательные стандарты и требования',
    content: `
      <a
        href="https://drive.google.com/file/d/1E90ZqDH-z1q3JcyGGBL2PTtlFM5KgaqC/view?usp=sharing"
        target="_blank"
      >
        ФГОС ДОО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1xFOx3TwzGQID0wQll5JtYL8WboHbW3dx/view?usp=sharing"
        target="_blank"
      >
        ФОП ДОО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1l6az-xHGkIU_XBubGzbWe6FwYZNVsWLa/view?usp=sharing"
        target="_blank"
      >
        ФГОС НОО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1jC7vTP09QdhBv0MeodastSq1xLJrDL0y/view?usp=sharing"
        target="_blank"
      >
        ФГОС НОО – Изменения
      </a><br />
      <a
        href="https://drive.google.com/file/d/1fkqCctlYnN4hOJmKsn6kHBynT-1xmvNB/view?usp=sharing"
        target="_blank"
      >
        ФОП НОО
      </a><br />
      <a
        href="https://drive.google.com/file/d/10sksvHanLJzFLPifVadzSoPPIGHL3tq-/view?usp=sharing"
        target="_blank"
      >
        ФГОС ООО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1D1n7z2DXaTr69maIFD-RTJW7coG5opMy/view?usp=sharing"
        target="_blank"
      >
        ФГОС ООО – Изменения
      </a><br />
      <a
        href="https://drive.google.com/file/d/1fvv8Ua6nPiTqZksitg91l5mj14zPYAgg/view?usp=sharing"
        target="_blank"
      >
        ФОП ООО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1AWWVVWBW55SL3sm-RZY7i5RjP99Rv7zE/view?usp=sharing"
        target="_blank"
      >
        ФГОС СОО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1fiLTDH9bW6jnmn2E5847OkLAO8I7EZbl/view?usp=sharing"
        target="_blank"
      >
        ФГОС СОО – Изменения
      </a><br />
      <a
        href="https://drive.google.com/file/d/13GmI00WcJ3Y730URJkJijo4-sI-H1JwQ/view?usp=sharing"
        target="_blank"
      >
        ФОП СОО
      </a><br /><br />
    `,
  },
  {
    title: 'Руководство. Педагогический (научно-педагогический) состав',
    content: `
      <a
        href="https://docs.google.com/document/d/150versuUvs6sMXIvVWKsSwUwMFakI0xO/edit?usp=sharing&amp;ouid=116656364710437484176&amp;rtpof=true&amp;sd=true"
        target="_blank"
      >
        Руководство. Педагогический состав
      </a><br />
      <a
        href="https://drive.google.com/file/d/1JGmoLKG0UN0W8gzgfDLvypBtvrXEbAUq/view?usp=sharing"
        target="_blank"
      >
        Руководство. Педагогический состав ЦРР
      </a>
    `,
  },
  {
    title: 'Материально-техническое обеспечение и оснащенность образовательного процесса',
    content: `
      <a
        href="https://myschool.edu.ru/?session_state=153f2459-0fd7-4236-81a9-a07419935aa5&amp;code=e577e146-de0f-49c6-bcd0-7bcb1271514c.153f2459-0fd7-4236-81a9-a07419935aa5.edcea56c-ed46-46ba-a176-7a9f34146f56"
        target="_blank"
        style="font-size: 30px;"
      >
        ЦОС "Моя школа"
      </a><br /><br />
      <a
        href="https://drive.google.com/file/d/1SE6b07w678d3LsK6e3aYH2TTS1CX_U01/view?usp=share_link"
        target="_blank"
      >
        Материально-техническое обеспечение СП Кирова, 27/1
      </a><br />
      <a
        href="https://drive.google.com/file/d/1-okH5xYDHEVnS6a7hivteTcDPRvkkrhi/view?usp=sharing"
        target="_blank"
      >
        Материально-техническое обеспечение филиал Москва
      </a><br />
      <a
        href="https://drive.google.com/file/d/1-okH5xYDHEVnS6a7hivteTcDPRvkkrhi/view?usp=sharing"
        target="_blank"
      >
        Материально-техническое обеспечение СП ОЦ
      </a><br />
      <a
        href="https://drive.google.com/file/d/1AyxyMT6Tr1puNE4bk85LkUoKfh8Y8AAF/view?usp=sharing"
        target="_blank"
      >
        Материально-техническое обеспечение ЦРР
      </a><br /><br />
    `,
  },
  {
    title: 'Стипендии и меры поддержки обучающихся',
    content: `
      <a
        href="https://drive.google.com/file/d/1-8xyFu_BU504xCHRZXCJUHahWBf_BjpJ/view?usp=sharing"
        target="_blank"
      >
        Стипендии и меры поддержки обучающихся
      </a><br /><br />
    `,
  },
  {
    title: 'Платные образовательные услуги',
    content: `
      <a
        href="https://docs.google.com/document/d/1a7_AWwzKUaPadS8PJOMqGWTyTnarl85F/edit?usp=share_link&amp;ouid=116656364710437484176&amp;rtpof=true&amp;sd=true"
        target="_blank"
      >
        Положение о платных образовательных услугах
      </a><br />
      <a
        href="https://drive.google.com/file/d/1d85HTn06LcT-bp3lztgwB1Ah82gvy4LI/view?usp=share_link"
        target="_blank"
      >
        Договор СОО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1cV8FyP5fCUiJEBa0k0yJj_8cexJcViYn/view?usp=share_link"
        target="_blank"
      >
        Договор ООО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1Iv9IuPEX7vTVP6-QMYgX2zqbFxCXnmIY/view?usp=share_link"
        target="_blank"
      >
        Договор НОО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1vd6qdNtBxHDRpuknF6JcSv1mYH-vO8lG/view?usp=share_link"
        target="_blank"
      >
        Договор ДО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1swSyeHRxBippUWmEja-YaGYZtm-EwUyd/view?usp=sharing"
        target="_blank"
      >
        Договор ДОО
      </a><br />
      <a
        href="https://drive.google.com/file/d/1x9aFe0SNIra0mdgFqOQUNNnw5JGAe1bI/view?usp=sharing"
        target="_blank"
      >
        Стоимость обучения
      </a><br /><br />
    `,
  },
  {
    title: 'Финансово-хозяйственная деятельность',
    content: `
      <a
        href="https://drive.google.com/file/d/1b-bkS9t9WRMqWgvlKa9hsH6hgvoJJE2M/view?usp=sharing"
        target="_blank"
      >
        Финансово-хозяйственная деятельность
      </a>
    `,
  },
  {
    title: 'Вакантные места для приема (перевода) обучающихся',
    content: `
      <a
        href="https://drive.google.com/file/d/1PNSX7bH8zoXfUrNH-bFpW9d523TffvIH/view?usp=sharing"
        target="_blank"
      >
        Вакантные места
      </a>
    `,
  },
  {
    title: 'Доступная среда',
    content: `
      <a
        href="https://drive.google.com/file/d/1AuS4JwGkw-7h66TeYIFDqXDnwwXMvvdb/view?usp=share_link"
        target="_blank"
      >
        Доступная среда
      </a>
    `,
  },
  {
    title: 'Международное сотрудничество',
    content: `
      <a
        href="https://drive.google.com/file/d/1v2P5WqM0gIMcpA4-iDO2UUZAMoA-34Y6/view?usp=share_link"
        target="_blank"
      >
        Международное сотрудничество
      </a>
    `,
  },
  {
    title: 'Организация питания в образовательной организации',
    content: `
      <a
        href="https://drive.google.com/file/d/1FFUdqYmDlxrjd5OMI-upv9u1wSa4ytke/view?usp=sharing"
        target="_blank"
      >
        Организация питания
      </a><br />
      <a
        href="https://drive.google.com/file/d/1bdovSgSU8hrOq39vhdfyv8bXZW73xdGy/view?usp=sharing"
        target="_blank"
      >
        Меню
      </a><br />
      <a
        href="https://drive.google.com/file/d/1SiadHesUm2gYQYN1YCZBEkicISQ4ecTb/view?usp=sharing"
        target="_blank"
      >
        Меню до 3-х лет
      </a><br />
      <a
        href="https://drive.google.com/file/d/1apu35c9kNxMrRkoIUnVIR86vzNFguGHl/view?usp=sharing"
        target="_blank"
      >
        Меню 3-7 лет
      </a>
    `,
  },
];



// Массив булевых значений, контролирующих «открыто/закрыто» для каждого пункта
const opened = ref(accordionItems.map(() => false));

function toggleAccordion(index) {
  // Сворачиваем/разворачиваем конкретный пункт аккордеона
  opened.value[index] = !opened.value[index];
}
</script>

<style scoped>
/* ----- Базовые стили для контейнера и заголовка ----- */
.documents-section {
  font-family: 'Montserrat';
  padding: 40px 0;
  /* Примерный отступ сверху/снизу */
  background-color: rgba(255, 232, 217, 1);
  /* Фон секции, по желанию */
  height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.documents-title {
  font-size: 2rem;
  margin-top: 120px;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-align: center;
}

/* ----- Стили аккордеона ----- */
.my-accordion {
  margin-top: 20px;
}

.my-accordion__item {
  margin-bottom: 12px;
  /* Отступ между пунктами */
  border-radius: 6px;
  /* Скруглённые углы */
  background-color: #fff;
  /* Фон самого блока */
  border: 1px solid #ddd;
  /* Лёгкая граница */
  overflow: hidden;
  /* Чтобы контент не вылезал за границы */
  transition: all 0.3s ease;
}

/* Заголовок аккордеона (кнопка) */
.my-accordion__header {
  padding: 0;
  /* Обнуление внешних отступов */
}

.my-accordion__button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  padding: 14px 16px;
  /* Внутренние отступы, чтобы было «воздух» */
  font-size: 1rem;
  color: #333;
  font-weight: 600;
  text-align: left;
  transition: background-color 0.2s;
}

.my-accordion__button:hover {
  background-color: #f5f5f5;
  /* Подсветка при наведении */
}

/* Текст в кнопке (заголовок) */
.my-accordion__button-text {
  flex: 1;
}

/* Иконка (плюс) */
.my-accordion__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  /* По умолчанию показываем + (ничего не вращая) */
}

/* При открытом пункте можно вращать иконку, чтоб превратился в «×» (или минус)
   угол поворота можно подбирать — например, 135deg для «×», 90deg для «–» и т.д. */
.my-accordion__icon--open {
  transform: rotate(45deg);
}

/* ----- Контент аккордеона ----- */
.my-accordion__content {
  /* v-show при false будет display: none, поэтому дополнительные анимации
     по высоте «из коробки» не получаются. Можно добавить CSS-транзишены или
     использовать <transition> для плавного сворачивания. */
}

.my-accordion__content-inner {
  padding: 12px 16px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #444;
}

.my-accordion__content-inner a {
  color: #0c6cb5;
  /* Синеватый цвет ссылок */
  text-decoration: none;
}

.my-accordion__content-inner a:hover {
  text-decoration: underline;
}
</style>
