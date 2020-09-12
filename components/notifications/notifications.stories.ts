import Vue from 'vue'
import { AppNotification } from '~/plugins/eventBus'

export default { title: 'Notification' }

export const notifications = () => {
  return Vue.extend({
    data() {
      return {
        alertText: 'Hello world!',
        alertType: 'warning' as AppNotification['type'],
      }
    },
    methods: {
      addNotification(): void {
        this.$eventBus.publish('notification', {
          type: this.alertType,
          content: this.alertText,
        })
      },
    },
    template: `
      <div>
        <section>
          <b-field label="Alert text">
            <b-input v-model="alertText"></b-input>
          </b-field>
        </section>
        <section>
          <div class="field">
            <b-radio v-model="alertType" native-value="info">
              Info
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="alertType" native-value="success">
              Success
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="alertType" native-value="danger">
              Danger
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="alertType" native-value="warning">
              Warning
            </b-radio>
          </div>
        </section>
        <section>
          <button @click="addNotification">Notify me!</button>
        </section>
        <notifications/>
      </div>
    `,
  })
}
