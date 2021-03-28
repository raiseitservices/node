FROM elastic/kibana:7.12.0

#USER root
#RUN apt-get update && apt-get install -y netcat

COPY entrypoint.sh /tmp/entrypoint.sh
USER root
RUN chmod +x /tmp/entrypoint.sh

USER kibana
ADD kibana.yml /etc/kibana/

CMD ["/tmp/entrypoint.sh"]